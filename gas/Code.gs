/**
 * ===============================================================
 * 設定項目 (ひばりが丘店のスタッフ様が編集する箇所です)
 * ===============================================================
 */

// 1. 回答を記録するスプレッドシートのIDを設定してください
const SPREADSHEET_ID = '1bI3QsuhvV-Na9akML05rqlwkBizCJdwflkoA5RdY2hI'; 

// 2. 申請があった場合に通知を受け取りたいメールアドレスを設定してください
const ADMIN_EMAILS = [
  'm-tokushige@okamoto-group.co.jp',
  'jf-yogahibarigaoka@okamoto-group.co.jp', // 店舗の代表メールアドレス
  's-kurokawa@okamoto-group.co.jp',
  'mito-sato@okamoto-group.co.jp',
  'ka-yoshida@okamoto-group.co.jp'
  // 必要に応じて、他のスタッフのメールアドレスを追加・削除
];

// 3. 店舗の公式メールアドレス（お客様への返信元として表示されることがあります）
const STORE_EMAIL = 'jf-yogahibarigaoka@okamoto-group.co.jp';

// 4. お客様への自動返信メールの送信者名として表示される店舗名
const STUDIO_NAME = 'JOYFIT YOGA フレスポひばりが丘';

/**
 * ===============================================================
 * 以下はシステムの動作に必要なため、編集しないでください
 * ===============================================================
 */

/**
 * ■■■ 追加機能: スプレッドシートのメニューバーに独自メニューを追加 ■■■
 * スプレッドシートを開いたときに自動実行されます。
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  // メニュー名「★データ更新」を追加
  ui.createMenu('★データ更新')
    .addItem('全シートのデザイン・設定を最新にする', 'applyStyleToAllSheets')
    .addToUi();
}

/**
 * doPost
 * HTMLフォームからPOSTリクエストを受け取ったときに実行されるメインの関数
 * @param {object} e - イベントオブジェクト
 * @returns {ContentService.TextOutput} - JSON形式のレスポンス
 */
function doPost(e) {
  try {
    if (!SPREADSHEET_ID) {
      throw new Error('スプレッドシートIDが設定されていません。スクリプトの設定項目を確認してください。');
    }
    const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
    const params = e.parameter;
    
    // アクションによる分岐
    // 1. 予約検索リクエストの場合
    if (params.action === 'search') {
      const email = params.email;
      if (!email) throw new Error('メールアドレスが指定されていません');
      
      const reservations = searchReservations(spreadsheet, email);
      
      return ContentService.createTextOutput(JSON.stringify({
        result: 'success',
        reservations: reservations
      })).setMimeType(ContentService.MimeType.JSON);
    }

    // 2. キャンセル確定リクエストの場合（検索結果からの送信）
    if (params.action === 'cancel_submit') {
       // 通常のキャンセル申請記録に加え、元の予約データにフラグを立てる
       processCancellation(spreadsheet, params);
       // その後は通常のフローへ合流（申請データの記録）
    }

    // --- 通常のフォーム送信処理 ---
    const formType = params.formType;

    // formTypeに応じて記録するシート名を決定
    const SHEET_MAP = {
      'trial_lesson': '体験予約フォーム',
      'pilates_reformer': 'ピラティスリフォーマーレッスンご予約',
      'hiatus_lesson': '休会中1回受講予約',
      'lost_found': '忘れ物お問い合わせ',
      'self_este_consent': 'セルフエステ同意書',
      'membership_card': '会員証発行',
      'cancel_request': 'キャンセル申請' 
    };

    const sheetName = SHEET_MAP[formType];
    if (!sheetName) {
      throw new Error('無効なフォームタイプです: ' + formType);
    }
    
    // シートが存在しない場合は作成する
    let sheet = spreadsheet.getSheetByName(sheetName);
    if (!sheet) {
      sheet = spreadsheet.insertSheet(sheetName);
      if (formType === 'cancel_request') {
        sheet.appendRow(['タイムスタンプ', 'メールアドレス', '会員番号', '氏名', 'キャンセル種別', '予約日時', '備考']);
      }
    }

    // スプレッドシートにデータを記録
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    const newRow = new Array(headers.length).fill('');
    const now = new Date();

    // タイムスタンプ・カラム名のマッピング処理
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i];
      if (header === 'タイムスタンプ' || header === 'Timestamp' || header === 'timestamp' || header === '日時') {
        newRow[i] = now;
      } else if (params[header]) {
        newRow[i] = params[header];
      }
    }
    if (newRow[0] === '') newRow[0] = now;

    sheet.appendRow(newRow);

    // ★ここでデザイン整形と管理列（台帳記入）の追加を実行★
    // (StyleManager.gsにある関数を呼び出す)
    if (typeof applySheetStyle === 'function') {
      applySheetStyle(sheet);
    }

    // メール送信処理
    sendNotificationEmailToStaff(sheetName, spreadsheet.getUrl());
    sendConfirmationEmailToCustomer(params);

    // 成功レスポンス
    return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: 'データ記録とメール送信に成功しました。'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    console.error('エラーが発生しました:', error.message, error.stack);
    return ContentService.createTextOutput(JSON.stringify({
      result: 'error',
      message: 'サーバー側でエラーが発生しました: ' + error.message
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * ■■■ 追加機能: 担当者入力時のタイムスタンプ自動入力 ■■■
 * スプレッドシートの「台帳記入」列が編集されたときに自動実行されます
 */
function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const range = e.range;
  const colIndex = range.getColumn();
  const rowIndex = range.getRow();
  
  // ヘッダー行(1行目)の編集は無視
  if (rowIndex === 1) return;

  // 編集された列のヘッダー名を取得
  const headerValue = sheet.getRange(1, colIndex).getValue();

  // ヘッダーが「台帳記入」の場合のみ動作
  if (headerValue === '台帳記入') {
    // 入力された値が空でない場合（名前を選んだ場合）
    if (e.value) {
      // 右隣のセル（対応日時）に現在日時を書き込む
      // フォーマット: "YYYY/MM/DD HH:mm"
      const now = Utilities.formatDate(new Date(), "Asia/Tokyo", "yyyy/MM/dd HH:mm");
      range.offset(0, 1).setValue(now);
    } else {
      // 名前を消した場合、日時も消す（必要であれば）
      range.offset(0, 1).clearContent();
    }
  }
}

/**
 * 指定されたメールアドレスで予約を検索する
 * 対象: 体験予約、ピラティス、休会中レッスン
 */
function searchReservations(spreadsheet, targetEmail) {
  const targetSheets = [
    { name: '体験予約フォーム', type: '体験レッスン', dateCol: 'lesson_datetime' }, // ※列名は想定。実際はヘッダー名検索
    { name: 'ピラティスリフォーマーレッスンご予約', type: 'ピラティスリフォーマー', dateCol: 'preferred_date_1' },
    { name: '休会中1回受講予約', type: '休会中レッスン', dateCol: 'lesson_datetime' }
  ];
  
  let results = [];
  const now = new Date();
  // 過去データをどこまで許容するか（ここでは本日以降のみとする場合）
  // now.setHours(0,0,0,0);

  targetSheets.forEach(conf => {
    const sheet = spreadsheet.getSheetByName(conf.name);
    if (!sheet) return;

    const lastRow = sheet.getLastRow();
    if (lastRow < 2) return;

    // ヘッダー取得
    const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
    
    // 必要な列インデックスを特定
    let emailIdx = -1;
    let nameIdx = -1;
    let dateIdx = -1; // 予約日時
    let remarksIdx = -1; // キャンセル済み確認用（備考欄などを利用）

    headers.forEach((h, i) => {
      const header = h.toString(); // 文字列化
      if (header.includes('メール') || header === 'email' || header === 'contact_info') emailIdx = i;
      if (header.includes('氏名') || header === 'name') nameIdx = i;
      if (header.includes('日時') || header.includes('希望日') || header.includes('date') || header === 'lesson_datetime') {
         // 複数ある場合、最初のものを採用するなどのロジックが必要だが、簡易的に上書き
         if (dateIdx === -1 || header.includes('第1')) dateIdx = i; 
      }
      if (header.includes('備考') || header === 'remarks') remarksIdx = i;
    });

    if (emailIdx === -1 || dateIdx === -1) return;

    // データを一括取得（行数が多い場合は分割などの考慮が必要だが、簡易実装）
    const data = sheet.getRange(2, 1, lastRow - 1, headers.length).getValues();

    data.forEach((row, rIndex) => {
      const email = row[emailIdx].toString();
      // メールアドレスが一致するか
      if (email === targetEmail) {
        // キャンセル済みかチェック（備考欄などに特定の文字があるか）
        const remarks = remarksIdx !== -1 ? row[remarksIdx].toString() : '';
        const isCancelled = remarks.includes('【キャンセル申請あり】') || remarks.includes('キャンセル済み');
        
        // 日付情報の取得（文字列かDateオブジェクトか）
        const dateVal = row[dateIdx];
        
        // 結果に追加 (行番号は ヘッダー1行 + 配列インデックス + 1 = rIndex + 2)
        results.push({
          sheet: conf.name,
          row: rIndex + 2,
          type: conf.type,
          datetime: dateVal,
          email: email,
          name: nameIdx !== -1 ? row[nameIdx] : '',
          status: isCancelled ? 'キャンセル済み' : '予約中'
        });
      }
    });
  });
  
  // 日付の新しい順（あるいは未来順）にソートなどしてもよい
  return results;
}

/**
 * キャンセル処理：元のデータの備考欄に追記する
 */
function processCancellation(spreadsheet, params) {
  const targetSheetName = params.targetSheet;
  const targetRow = parseInt(params.targetRow, 10);
  
  if (!targetSheetName || !targetRow) return;
  
  const sheet = spreadsheet.getSheetByName(targetSheetName);
  if (!sheet) return;

  // 備考欄のカラムを探す
  const headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  let remarksIdx = -1;
  // 既存の備考欄を探す、なければ最終列に追加する想定
  for(let i=0; i<headers.length; i++) {
     if(headers[i].includes('備考') || headers[i] === 'remarks') {
       remarksIdx = i;
       break;
     }
  }
  
  const cancelNote = `【キャンセル申請あり】申請日時: ${new Date().toLocaleString('ja-JP')}`;

  if (remarksIdx !== -1) {
    // 既存の備考欄に追記
    const cell = sheet.getRange(targetRow, remarksIdx + 1);
    const currentVal = cell.getValue();
    if (!currentVal.toString().includes('【キャンセル申請あり】')) {
       cell.setValue(currentVal + '\n' + cancelNote);
    }
  } else {
    // 備考欄が見つからない場合、メモとして背景色を変える等の処理でも良いが
    // ここでは簡易的に、その行の背景色をグレーにする
    sheet.getRange(targetRow, 1, 1, sheet.getLastColumn()).setBackground('#d3d3d3');
  }

  // ★追加: 行全体をグレーアウト＆取り消し線★
  const rowRange = sheet.getRange(targetRow, 1, 1, sheet.getLastColumn());
  rowRange.setBackground('#d9d9d9');      // 背景をグレーに
  rowRange.setFontColor('#808080');       // 文字色をグレーに
  rowRange.setFontLine('line-through');   // 取り消し線を追加
}

/**
 * 店舗管理者へ通知メールを送信する関数
 * @param {string} formName - フォーム名
 * @param {string} spreadsheetUrl - スプレッドシートのURL
 */
function sendNotificationEmailToStaff(formName, spreadsheetUrl) {
  if (ADMIN_EMAILS.length === 0) return;
  try {
    const subject = `【${STUDIO_NAME}】${formName}の申請が来ました。`;
    const body = `
${formName}に新しい申請がありました。

下記リンクよりスプレッドシートをご確認の上、ご対応をお願いいたします。

▼確認用リンク
${spreadsheetUrl}
`;
    // To: にカンマ区切りの文字列として設定
    MailApp.sendEmail(ADMIN_EMAILS.join(','), subject, body);
  } catch (e) {
    console.error(`管理者への通知メール送信に失敗: ${e.toString()}`);
  }
}

/**
 * お客様へ申請完了の確認メールを送信する関数
 * @param {object} params - フォームから送信されたパラメータ
 */
function sendConfirmationEmailToCustomer(params) {
  try {
    let recipient = '';
    let subject = '';
    let body = '';
    const customerName = params.name || 'お客様'; // 氏名がないフォームも考慮

    // フォームタイプに応じて送信先とメール内容を決定
    switch (params.formType) {
      case 'trial_lesson':
        recipient = params.email;
        subject = `【${STUDIO_NAME}】スタジオレッスン体験のご予約ありがとうございます`;
        // 文言修正
        body = `
${customerName} 様

この度は、JOYFIT YOGA フレスポひばりが丘の体験レッスンにお申し込みいただき、
誠にありがとうございます。
以下の内容でご予約のリクエストを承りました。
※満員などによりご希望に添えない場合のみ、改めてご連絡させていただきます。

ご希望日時: ${params.lesson_datetime || '未入力'}

ご予約が確定の場合は、こちらからのご連絡はいたしませんので、ご希望の日時にお越しください。
当日は、レッスン開始の15分前までに店舗へお越しください。
スタッフ一同、心よりお待ちしております。

※本メールは送信専用です。
`;
        break;

      case 'pilates_reformer':
        recipient = params.contact_info; 
        subject = `【${STUDIO_NAME}】ピラティスリフォーマー パーソナル予約ありがとうございます`;
        body = `
${customerName} 様

この度は、ピラティスリフォーマーのパーソナルレッスンにお申し込みいただき、ありがとうございます。
ご希望内容を確認の上、改めて担当者より日程調整のご連絡をさせていただきます。

今しばらくお待ちくださいますようお願い申し上げます。

※本メールは送信専用です。
`;
        break;

      case 'hiatus_lesson':
        recipient = params.email;
        subject = `【${STUDIO_NAME}】休会中レッスンのご予約ありがとうございます`;
        // 文言修正
        body = `
${customerName} 様

休会中のレッスン受講予約のリクエストを承りました。
※満員などによりご希望に添えない場合のみ、改めてご連絡させていただきます。

ご希望日時: ${params.lesson_datetime || '未入力'}

ご予約が確定の場合は、こちらからのご連絡はいたしませんので、ご希望の日時にお越しください。

※本メールは送信専用です。
`;
        break;

      case 'lost_found':
        // 連絡方法がEメールの場合のみ送信
        if (params.contactMethod === 'email' && params.contact_email) {
          recipient = params.contact_email;
          subject = `【${STUDIO_NAME}】お忘れ物のお問い合わせありがとうございます`;
          body = `
${customerName} 様

お忘れ物についてのお問い合わせを承りました。
確認後、改めてご連絡させていただきますので、今しばらくお待ちください。

※本メールは送信専用です。
`;
        }
        break;
      
      case 'membership_card':
        recipient = params.email;
        subject = `【${STUDIO_NAME}】会員証発行のご予約ありがとうございます`;
        body = `
${customerName} 様

この度はWEB入会いただき、誠にありがとうございます。
会員証発行のご予約を以下の内容で承りました。

ご希望日: ${params.pickup_date || '未入力'}

当日は防犯用の写真撮影と、簡単なアンケートへのご協力をお願いしております。
ご来館を心よりお待ちしております。

※本メールは送信専用です。
`;
        break;

      case 'cancel_request':
        recipient = params.email;
        subject = `【${STUDIO_NAME}】キャンセル申請を承りました`;
        body = `
${customerName} 様

以下のキャンセル申請を承りました。

キャンセル種別: ${params.cancel_type || '未選択'}
キャンセル日時: ${params.cancel_datetime || '未入力'}

内容を確認し、手続きを進めさせていただきます。
直前キャンセルの場合は、行き違いでご連絡が行く場合もございますがご了承ください。

※本メールは送信専用です。
`;
        break;

      case 'self_este_consent':
        return; 
    }

    // 送信先が確定している場合のみメールを送信
    if (recipient) {
      MailApp.sendEmail(recipient, subject, body, {
          name: STUDIO_NAME,
          replyTo: STORE_EMAIL // お客様が返信した場合の宛先
      });
    }
  } catch (e) {
    console.error(`お客様への確認メール送信に失敗: ${e.toString()}`);
  }
}
