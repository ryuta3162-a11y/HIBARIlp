/**
 * レッスン一覧（月切り替え式）・予約不可日程・休講/変更・予約数
 * LESSONS / MONTH_NOTES / BLOCKED_SEED は初回セットアップ用（2026年10月分）
 */

const LESSON_SHEET_NAME = 'レッスン一覧';
const LESSON_MONTH = '2026-10';

const PILATES_NOTE = '※リフォーマー会員様のみご参加可能／滑り止め靴下必須';
const LAVA_NOTE = '※温度湿度が低い場合がございます。';

// [曜日, 開始, 終了, レッスン名, 強度, 定員, 備考]
const LESSONS = [
  ['月', '10:00', '10:45', 'フローヨガ', '★★', '', ''],
  ['月', '11:15', '12:00', 'アシュタンガヨガ', '★★★', '', ''],
  ['月', '12:30', '13:15', 'ゆるふわデトックスヨガ', '★', '', '※26日ご予約済パーソナル'],
  ['月', '15:00', '16:00', 'マシンピラティス トータルボディメイク', '★', 6, PILATES_NOTE],
  ['月', '18:45', '19:45', 'マシンピラティス 姿勢美人', '★★', 6, PILATES_NOTE + '／※5日ご予約済パーソナル'],
  ['月', '20:15', '21:15', 'マシンピラティス 桃尻メイク', '★★★', 6, PILATES_NOTE],

  ['火', '10:00', '11:00', 'マシンピラティス お腹引き締め', '★★★', 6, PILATES_NOTE],
  ['火', '11:30', '12:30', 'マシンピラティス ベーシック', '★★', 6, PILATES_NOTE],
  ['火', '13:30', '14:15', '溶岩浴', '', '', LAVA_NOTE + '／27日プロジェクターレッスン'],
  ['火', '14:45', '15:30', '整えるヨガ', '★★', '', LAVA_NOTE],
  ['火', '16:00', '16:45', 'ホイールで体幹アップヨガ', '★★★', 11, LAVA_NOTE],
  ['火', '19:15', '20:00', 'リンパヨガ', '★', '', ''],
  ['火', '20:30', '21:15', '骨盤コンディショニング', '★★', '', ''],

  ['水', '10:00', '10:45', '股関節を緩めるヨガ', '★', '', ''],
  ['水', '11:15', '12:00', '骨盤調整ヨガ', '★★', '', ''],
  ['水', '12:45', '13:30', '溶岩浴', '', '', ''],
  ['水', '14:00', '14:45', 'ウェルエイジングヨガ', '★★', '', ''],
  ['水', '15:15', '16:15', '眠活ヨガ', '★', '', '7日プロジェクターレッスン'],
  ['水', '16:45', '17:30', '溶岩浴', '', '', ''],
  ['水', '19:15', '20:00', 'からだ調整ヨガ', '★★', '', ''],
  ['水', '20:30', '21:15', 'リラックスヨガ', '★', '', ''],

  ['木', '10:00', '10:45', '猫背&ネックリリースヨガ', '★', '', '※15日はイベントレッスン（要確認）'],
  ['木', '11:15', '12:15', '腰すっきりヨガ', '★★', '', ''],
  ['木', '12:45', '13:30', '美脚・美尻ヨガ', '★★', '', ''],
  ['木', '14:00', '14:45', 'からだほぐしヨガ', '★', '', ''],
  ['木', '15:15', '16:00', '胸郭解放ヨガ', '★★', 8, ''],
  ['木', '18:00', '18:45', '溶岩浴', '', '', ''],
  ['木', '19:15', '20:00', 'ビギナーヨガ', '★', '', ''],
  ['木', '20:30', '21:15', 'ヴィンヤサフロー', '★★★', '', ''],

  ['金', '15:30', '16:30', 'マシンピラティス 魅せるバック&アームズ Ver.2', '★★', 6, PILATES_NOTE + '／※2日ご予約済パーソナル'],
  ['金', '17:00', '18:00', 'マシンピラティス チェストオープン', '★★', 6, PILATES_NOTE],
  ['金', '18:30', '19:30', 'マシンピラティス トータルボディメイク', '★', 6, PILATES_NOTE],
  ['金', '20:00', '21:00', 'マシンピラティス お腹引き締め', '★★★', 6, PILATES_NOTE],

  ['土', '9:30', '10:15', 'からだ調整ヨガ', '★★', '', ''],
  ['土', '10:45', '11:30', 'リフレッシュヨガ', '★', '', ''],
  ['土', '12:15', '13:00', 'フローヨガ', '★★', '', ''],
  ['土', '13:30', '14:15', 'ベーシックヨガ', '★', '', ''],
  ['土', '14:45', '15:30', 'スプリットヨガ', '★★★', '', '3日プロジェクターレッスン'],
  ['土', '16:00', '17:00', 'ゆるめるストレッチヨガ', '★', '', '※10日ご予約済パーソナル'],

  ['日', '9:30', '10:15', '艶美ヨガ（要確認）', '★★★', '', ''],
  ['日', '10:45', '11:45', 'ゼロコア', '★★', '', ''],
  ['日', '12:30', '13:15', 'リラックスヨガ', '★', '', ''],
  ['日', '13:45', '14:30', 'フローヨガ', '★★', '', ''],
  ['日', '15:00', '15:45', '快眠ヨガ', '★', '', ''],
  ['日', '16:15', '17:00', 'アンチエイジングヨガ', '★★', '', '']
];

const MONTH_NOTES = [
  ['営業時間（月〜木）', '9:30〜22:00'],
  ['営業時間（金）', '15:00〜21:30'],
  ['営業時間（土日）', '9:00〜17:30']
];

/* ===============================================================
 * レッスン一覧シート（月切り替え式）
 *  A1        : 表示月（プルダウン）。切り替えると表示中の内容を保存して別の月を読み込む
 *  A〜G列    : レッスン
 *  L〜T列    : 予約不可・休講・時間変更 日程一覧
 *  V〜W列    : 営業時間
 *  各月のデータは「月別データ」シート（非表示）に保存し、表示中の月だけはレッスン一覧が正
 * =============================================================== */

const STORE_SHEET_NAME = '月別データ（編集不要）';
const STORE_WIDTH = 10;
const VIEW_FIRST_ROW = 3;
const VIEW_ROWS = 200;
const LESSON_HEADERS = ['曜日', '開始', '終了', '分数', 'レッスン名', '強度', '備考'];
const BLOCKED_COL = 12; // L
const BLOCKED_HEADERS = ['日付', '曜日', '種別', '開始', '終了', '変更後 開始', '変更後 終了', '理由・表示文', 'LP掲載'];
const BLOCKED_TYPES = ['休講', '時間変更'];
const NOTES_COL = 22; // V
const NOTE_HEADERS = ['項目', '内容'];
const WEEKDAY_ORDER = ['月', '火', '水', '木', '金', '土', '日'];
const BLOCKED_SEED = [
  ['2026-10-05', '15:00', '16:00', ''],
  ['2026-10-05', '16:30', '17:30', ''],
  ['2026-10-05', '18:45', '19:45', ''],
  ['2026-10-05', '20:15', '21:15', ''],
  ['2026-10-06', '10:00', '11:00', ''],
  ['2026-10-06', '11:30', '12:30', ''],
  ['2026-10-07', '15:15', '16:15', ''],
  ['2026-10-08', '11:15', '12:15', ''],
  ['2026-10-09', '', '', '休館日'],
  ['2026-10-10', '16:00', '17:00', ''],
  ['2026-10-12', '', '', '祝日プログラムをご確認ください'],
  ['2026-10-26', '12:30', '13:30', '']
];

function monthLabel_(key) {
  const p = String(key).split('-');
  return p[0] + '年' + Number(p[1]) + '月';
}

function monthKey_(label) {
  const m = String(label || '').match(/(\d{4})\D+(\d{1,2})/);
  return m ? m[1] + '-' + ('0' + m[2]).slice(-2) : '';
}

function addMonths_(key, n) {
  const p = key.split('-').map(Number);
  const d = new Date(p[0], p[1] - 1 + n, 1);
  return d.getFullYear() + '-' + ('0' + (d.getMonth() + 1)).slice(-2);
}

function currentMonthKey_() {
  return Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy-MM');
}

function normDate_(s) {
  const m = String(s || '').match(/(\d{4})\D(\d{1,2})\D(\d{1,2})/);
  return m ? m[1] + '-' + ('0' + m[2]).slice(-2) + '-' + ('0' + m[3]).slice(-2) : '';
}

function normTime_(s) {
  const m = String(s || '').replace('：', ':').match(/(\d{1,2}):(\d{2})/);
  return m ? Number(m[1]) + ':' + m[2] : '';
}

function withDocumentLock_(fn) {
  let lock = null;
  try {
    lock = LockService.getDocumentLock();
    lock.waitLock(25000);
  } catch (e) {
    lock = null;
  }
  try {
    return fn();
  } finally {
    if (lock) lock.releaseLock();
  }
}

/* ---------- 月別データ（保存先） ---------- */

function getStoreSheet_(ss) {
  let store = ss.getSheetByName(STORE_SHEET_NAME);
  if (!store) {
    store = ss.insertSheet(STORE_SHEET_NAME);
    store.getRange(1, 1, store.getMaxRows(), STORE_WIDTH).setNumberFormat('@');
    store.getRange(1, 1, 1, 3).setValues([['区分', '月', 'データ']]);
    store.getRange('L1:M1').setNumberFormat('@').setValues([['表示中の月', '']]);
    store.hideSheet();
  }
  return store;
}

/** [区分, 月, 値...] の配列 */
function readStore_(store) {
  const last = store.getLastRow();
  if (last < 2) return [];
  return store.getRange(2, 1, last - 1, STORE_WIDTH).getDisplayValues()
    .filter(function(r) { return r[0] && r[1]; });
}

/** rows: [区分, 値...]（月なし） */
function writeStoreMonth_(store, month, rows) {
  const others = readStore_(store).filter(function(r) { return r[1] !== month; });
  const mine = rows.map(function(r) {
    const out = [r[0], month].concat(r.slice(1)).map(function(v) { return v === undefined || v === null ? '' : String(v); });
    while (out.length < STORE_WIDTH) out.push('');
    return out.slice(0, STORE_WIDTH);
  });
  const all = others.concat(mine);
  const oldCount = Math.max(store.getLastRow() - 1, 0);
  if (all.length) store.getRange(2, 1, all.length, STORE_WIDTH).setNumberFormat('@').setValues(all);
  if (oldCount > all.length) store.getRange(2 + all.length, 1, oldCount - all.length, STORE_WIDTH).clearContent();
}

function getLoadedMonth_(store) {
  return store ? store.getRange('M1').getDisplayValue() : '';
}

function setLoadedMonth_(store, month) {
  store.getRange('M1').setNumberFormat('@').setValue(month);
}

function storeRowsOf_(store, month) {
  return readStore_(store)
    .filter(function(r) { return r[1] === month; })
    .map(function(r) { return [r[0]].concat(r.slice(2)); });
}

/* ---------- レッスン一覧（表示） ---------- */

/** 表示中の内容を [区分, 値...] で返す */
function readViewRows_(sheet) {
  const f = VIEW_FIRST_ROW;
  const v = sheet.getRange(f, 1, VIEW_ROWS, NOTES_COL + 1).getDisplayValues();
  const checks = sheet.getRange(f, BLOCKED_COL + 8, VIEW_ROWS, 1).getValues();
  const rows = [];
  v.forEach(function(r) {
    if (r[0] || r[1] || r[4]) rows.push(['lesson', r[0], r[1], r[2], r[4], r[5], '', r[6]]);
  });
  v.forEach(function(r, i) {
    const b = r.slice(BLOCKED_COL - 1);
    const d = normDate_(b[0]);
    if (d) rows.push(['blocked', d, b[3], b[4], b[7], String(checks[i][0]).toUpperCase() === 'TRUE' ? 'TRUE' : 'FALSE', b[2], b[5], b[6]]);
  });
  v.forEach(function(r) {
    if (r[NOTES_COL - 1] || r[NOTES_COL]) rows.push(['note', r[NOTES_COL - 1], r[NOTES_COL]]);
  });
  return rows;
}

function writeView_(sheet, rows) {
  const f = VIEW_FIRST_ROW;
  const n = VIEW_ROWS;
  const pick = function(kind) {
    return rows.filter(function(r) { return r[0] === kind; }).map(function(r) { return r.slice(1); });
  };
  const cell = function(v, i) { return v[i] === undefined || v[i] === null ? '' : v[i]; };
  const pad = function(list, width, fill) {
    const out = list.slice(0, n);
    while (out.length < n) out.push(new Array(width).fill(fill));
    return out;
  };

  const lessons = pick('lesson');
  sheet.getRange(f, 1, n, 3).setValues(pad(lessons.map(function(v) { return [cell(v, 0), cell(v, 1), cell(v, 2)]; }), 3, ''));
  sheet.getRange(f, 5, n, 3).setValues(pad(lessons.map(function(v) {
    return [cell(v, 3), cell(v, 4), cell(v, 6)];
  }), 3, ''));

  const blocked = pick('blocked');
  sheet.getRange(f, BLOCKED_COL, n, 1).setValues(pad(blocked.map(function(v) {
    const d = normDate_(v[0]);
    if (!d) return [''];
    const p = d.split('-').map(Number);
    return [new Date(p[0], p[1] - 1, p[2])];
  }), 1, ''));
  sheet.getRange(f, BLOCKED_COL + 2, n, 6).setValues(pad(blocked.map(function(v) {
    const type = BLOCKED_TYPES.indexOf(cell(v, 5)) === -1 ? '' : cell(v, 5);
    return [type, cell(v, 1), cell(v, 2), cell(v, 6), cell(v, 7), cell(v, 3)];
  }), 6, ''));
  sheet.getRange(f, BLOCKED_COL + 8, n, 1).setValues(pad(blocked.map(function(v) { return [String(v[4]).toUpperCase() === 'TRUE']; }), 1, false));

  const notes = pick('note');
  sheet.getRange(f, NOTES_COL, n, 2).setValues(pad(notes.map(function(v) { return [cell(v, 0), cell(v, 1)]; }), 2, ''));
}

function buildLessonView_(sheet) {
  const f = VIEW_FIRST_ROW;
  const n = VIEW_ROWS;
  const last = f + n - 1;
  if (sheet.getMaxRows() < last) sheet.insertRowsAfter(sheet.getMaxRows(), last - sheet.getMaxRows());
  if (sheet.getMaxColumns() < NOTES_COL + 1) sheet.insertColumnsAfter(sheet.getMaxColumns(), NOTES_COL + 1 - sheet.getMaxColumns());

  const all = sheet.getRange(1, 1, sheet.getMaxRows(), sheet.getMaxColumns());
  all.breakApart();
  all.clear();
  all.clearDataValidations();
  all.clearNote();
  sheet.setConditionalFormatRules([]);
  sheet.setFrozenRows(0);

  sheet.getRange('A1').setNumberFormat('@').setFontSize(13).setFontWeight('bold')
    .setBackground('#FFF2CC').setHorizontalAlignment('center').setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, '#E0A800', SpreadsheetApp.BorderStyle.SOLID_MEDIUM)
    .setNote('表示する月を選びます。\n切り替える前の月の内容は自動で保存されます。');
  sheet.getRange('B1:I1').merge()
    .setValue('◀ 月を選ぶと、その月のレッスン・予約不可日・営業時間に切り替わります（入力内容は自動保存）。' +
      '翌月分は「前月をコピー → 月を切り替え → 貼り付け」か、メニュー「★データ更新 → 前月のレッスンをこの月にコピー」で作成できます。')
    .setFontColor('#7F6000').setFontSize(10).setWrap(true).setVerticalAlignment('middle');
  sheet.getRange(1, BLOCKED_COL, 1, BLOCKED_HEADERS.length).merge()
    .setValue('予約不可・休講・時間変更 日程一覧（種別が空欄なら WEB予約を止めるだけ）')
    .setBackground('#C0392B').setFontColor('#ffffff').setFontWeight('bold').setVerticalAlignment('middle');
  sheet.getRange(1, NOTES_COL, 1, 2).merge()
    .setValue('営業時間（LPに表示）')
    .setBackground('#008374').setFontColor('#ffffff').setFontWeight('bold').setVerticalAlignment('middle');
  sheet.setRowHeight(1, 44);

  sheet.getRange(2, 1, 1, LESSON_HEADERS.length).setValues([LESSON_HEADERS])
    .setFontWeight('bold').setBackground('#008374').setFontColor('#ffffff');
  sheet.getRange(2, BLOCKED_COL, 1, BLOCKED_HEADERS.length).setValues([BLOCKED_HEADERS])
    .setFontWeight('bold').setBackground('#E6B8B7');
  sheet.getRange(2, BLOCKED_COL).setNote(
    '種別を選んで入力します。\n' +
    '・空欄：その時間帯に始まるレッスンを予約不可にする（開始/終了が空欄なら終日）\n' +
    '・休講：開始の時刻のレッスンをLPに「休講」と表示\n' +
    '・時間変更：開始の時刻のレッスンを「変更後 開始/終了」に変えて表示\n' +
    '・LP掲載のチェックを外すと無効になります');
  sheet.getRange(2, NOTES_COL, 1, 2).setValues([NOTE_HEADERS])
    .setFontWeight('bold').setBackground('#B7DED8');

  sheet.getRange(f, 1, n, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(WEEKDAY_ORDER, true).setAllowInvalid(false).build());
  sheet.getRange(f, 2, n, 2).setNumberFormat('@');
  sheet.getRange(f, 4).setFormula('=ARRAYFORMULA(IF((B' + f + ':B' + last + '="")+(C' + f + ':C' + last + '=""),"",' +
    'IFERROR(ROUND((TIMEVALUE(C' + f + ':C' + last + ')-TIMEVALUE(B' + f + ':B' + last + '))*1440),"")))');
  sheet.getRange(f, 4, n, 1).setFontColor('#888888');
  sheet.getRange(f, 7, n, 1).setWrap(true);
  sheet.getRange(f, 5, n, 1).setFontWeight('bold');

  sheet.getRange(f, BLOCKED_COL, n, 1).setNumberFormat('yyyy/mm/dd')
    .setDataValidation(SpreadsheetApp.newDataValidation().requireDate().setAllowInvalid(false).build());
  const L = String.fromCharCode(64 + BLOCKED_COL);
  sheet.getRange(f, BLOCKED_COL + 1).setFormula(
    '=ARRAYFORMULA(IF(' + L + f + ':' + L + last + '="","",MID("日月火水木金土",WEEKDAY(' + L + f + ':' + L + last + '),1)))');
  sheet.getRange(f, BLOCKED_COL + 2, n, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(BLOCKED_TYPES, true).setAllowInvalid(false).build());
  sheet.getRange(f, BLOCKED_COL + 3, n, 4).setNumberFormat('@');
  sheet.getRange(f, BLOCKED_COL + 8, n, 1).setNumberFormat('General').insertCheckboxes();
  sheet.getRange(f, BLOCKED_COL, n, BLOCKED_HEADERS.length).setBackground('#FDF2F2');

  sheet.setConditionalFormatRules([
    SpreadsheetApp.newConditionalFormatRule()
      .whenFormulaSatisfied('=$' + String.fromCharCode(64 + BLOCKED_COL + 2) + f + '<>"時間変更"')
      .setBackground('#EEEEEE')
      .setRanges([sheet.getRange(f, BLOCKED_COL + 5, n, 2)])
      .build()
  ]);

  sheet.getRange(f, NOTES_COL, n, 2).setNumberFormat('@').setWrap(true).setVerticalAlignment('top');

  sheet.setFrozenRows(2);
  [100, 60, 60, 50, 260, 60, 320, 20, 20, 20, 20, 100, 40, 90, 60, 60, 90, 90, 220, 60, 20, 150, 380]
    .forEach(function(w, i) { sheet.setColumnWidth(i + 1, w); });
}

function refreshMonthValidation_(sheet, store) {
  const cur = currentMonthKey_();
  const months = readStore_(store).map(function(r) { return r[1]; });
  for (let i = -1; i <= 3; i++) months.push(addMonths_(cur, i));
  const uniq = months.filter(function(m, i) { return /^\d{4}-\d{2}$/.test(m) && months.indexOf(m) === i; }).sort();
  sheet.getRange('A1').setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(uniq.map(monthLabel_), true).setAllowInvalid(false).build());
}

function loadMonthIntoView_(sheet, store, month) {
  writeView_(sheet, storeRowsOf_(store, month));
  setLoadedMonth_(store, month);
  refreshMonthValidation_(sheet, store);
  sheet.getRange('A1').setValue(monthLabel_(month));
}

/* ---------- 初期化・移行 ---------- */

function isLessonViewReady_(ss) {
  const sheet = ss.getSheetByName(LESSON_SHEET_NAME);
  const store = ss.getSheetByName(STORE_SHEET_NAME);
  return !!(sheet && store && getLoadedMonth_(store) && sheet.getRange(2, 1).getValue() === LESSON_HEADERS[0]);
}

function ensureLessonSheetLayout_(ss) {
  if (isLessonViewReady_(ss)) return;
  withDocumentLock_(function() {
    if (isLessonViewReady_(ss)) return;
    const sheet = ss.getSheetByName(LESSON_SHEET_NAME) || ss.insertSheet(LESSON_SHEET_NAME);
    const store = getStoreSheet_(ss);
    if (!readStore_(store).length) seedStore_(store);
    buildLessonView_(sheet);
    loadMonthIntoView_(sheet, store, currentMonthKey_());
    SpreadsheetApp.flush();
  });
}

function seedStore_(store) {
  const rows = LESSONS.map(function(l) { return ['lesson'].concat(l); })
    .concat(BLOCKED_SEED.map(function(b) { return ['blocked', b[0], b[1], b[2], b[3], 'TRUE']; }))
    .concat(MONTH_NOTES.map(function(n) { return ['note', n[0], n[1]]; }));
  writeStoreMonth_(store, LESSON_MONTH, rows);
}

/* ---------- 月の切り替え・コピー ---------- */

/** onEdit から呼ばれる（シンプルトリガー） */
function handleLessonSheetEdit_(e) {
  const r = e.range;
  if (r.getRow() !== 1 || r.getColumn() !== 1) return;
  switchLessonMonth_(e.source, r.getSheet().getRange('A1').getDisplayValue());
}

function switchLessonMonth_(ss, label) {
  withDocumentLock_(function() {
    const sheet = ss.getSheetByName(LESSON_SHEET_NAME);
    const store = getStoreSheet_(ss);
    const loaded = getLoadedMonth_(store);
    const next = monthKey_(label);
    if (!next) {
      if (loaded) sheet.getRange('A1').setValue(monthLabel_(loaded));
      return;
    }
    if (next === loaded) return;
    if (loaded) writeStoreMonth_(store, loaded, readViewRows_(sheet));
    loadMonthIntoView_(sheet, store, next);
    SpreadsheetApp.flush();
  });
}

/** メニュー：前月のレッスン・営業時間を表示中の月にコピー（予約不可日はコピーしない） */
function copyPreviousMonthLessons() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();
  ensureLessonSheetLayout_(ss);
  const sheet = ss.getSheetByName(LESSON_SHEET_NAME);
  const store = getStoreSheet_(ss);
  const loaded = getLoadedMonth_(store);
  const prev = addMonths_(loaded, -1);
  const prevRows = storeRowsOf_(store, prev).filter(function(r) { return r[0] !== 'blocked'; });
  if (!prevRows.length) {
    ui.alert(monthLabel_(prev) + 'のデータがありません。');
    return;
  }
  const current = readViewRows_(sheet);
  if (current.some(function(r) { return r[0] === 'lesson'; })) {
    const ok = ui.alert(monthLabel_(loaded) + 'のレッスンを、' + monthLabel_(prev) + 'の内容で上書きします。よろしいですか？',
      ui.ButtonSet.YES_NO);
    if (ok !== ui.Button.YES) return;
  }
  withDocumentLock_(function() {
    writeView_(sheet, prevRows.concat(current.filter(function(r) { return r[0] === 'blocked'; })));
    writeStoreMonth_(store, loaded, readViewRows_(sheet));
  });
  sheet.activate();
  ui.alert(monthLabel_(prev) + 'の内容をコピーしました。変更があるレッスンだけ修正してください。');
}

/* ---------- LP向け読み取り ---------- */

/** 全月の [区分, 月, 値...]（表示中の月はレッスン一覧の内容を使う） */
function collectMonthRows_(ss) {
  const sheet = ss.getSheetByName(LESSON_SHEET_NAME);
  const store = ss.getSheetByName(STORE_SHEET_NAME);
  if (!sheet || !store) return [];
  return withDocumentLock_(function() {
    const loaded = getLoadedMonth_(store);
    const rows = readStore_(store).filter(function(r) { return r[1] !== loaded; });
    if (loaded) {
      readViewRows_(sheet).forEach(function(r) { rows.push([r[0], loaded].concat(r.slice(1))); });
    }
    return rows;
  });
}

function lessonsFrom_(rows) {
  return rows
    .filter(function(r) { return r[0] === 'lesson' && r[2] && normTime_(r[3]) && r[5]; })
    .map(function(r) {
      const start = normTime_(r[3]);
      const end = normTime_(r[4]);
      return {
        month: r[1],
        day: String(r[2]).trim(),
        start: start,
        end: end,
        minutes: end ? toMin_(end) - toMin_(start) : '',
        name: String(r[5]).trim(),
        intensity: String(r[6] || ''),
        note: String(r[8] || '')
      };
    });
}

function blockedFrom_(rows) {
  return rows
    .filter(function(r) { return r[0] === 'blocked' && normDate_(r[2]) && String(r[6]).toUpperCase() === 'TRUE'; })
    .map(function(r) {
      return {
        date: normDate_(r[2]),
        type: BLOCKED_TYPES.indexOf(String(r[7] || '').trim()) === -1 ? '' : String(r[7]).trim(),
        start: normTime_(r[3]),
        end: normTime_(r[4]),
        newStart: normTime_(r[8]),
        newEnd: normTime_(r[9]),
        message: String(r[5] || '').trim()
      };
    });
}

function notesFrom_(rows) {
  return rows
    .filter(function(r) { return r[0] === 'note' && r[2] && r[3]; })
    .map(function(r) { return { month: r[1], label: String(r[2]), value: String(r[3]) }; });
}

function toMin_(t) {
  if (!t) return null;
  const p = String(t).split(':');
  return Number(p[0]) * 60 + Number(p[1] || 0);
}

function isSlotBlocked_(ss, slot) {
  const date = slot.slice(0, 10);
  const start = toMin_(slot.slice(11));
  return blockedFrom_(collectMonthRows_(ss)).some(function(b) {
    if (b.date !== date || b.type === '時間変更') return false;
    if (!b.start) return true;
    if (b.type === '休講' && !b.end) return toMin_(b.start) === start;
    const s = toMin_(b.start);
    const e = b.end ? toMin_(b.end) : 24 * 60;
    return start >= s && start < e;
  });
}

/** 予約できる最終日（今日から翌月の同日の前日まで。例：10/6 → 11/5） */
function bookingLimit_(today) {
  const p = today.split('-').map(Number);
  const daysInNext = new Date(p[0], p[1] + 1, 0).getDate();
  return Utilities.formatDate(new Date(p[0], p[1], Math.min(p[2], daysInNext) - 1), 'Asia/Tokyo', 'yyyy-MM-dd');
}

function isSlotInWindow_(slot) {
  const today = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd');
  const date = slot.slice(0, 10);
  return date >= today && date <= bookingLimit_(today);
}

/* ===============================================================
 * 休講・変更 管理
 * =============================================================== */

const CHANGE_SHEET_NAME = '休講・変更';
const CHANGE_TYPES = ['休講', '時間変更', 'レッスン変更', '代行', '追加', '休館日', 'お知らせ'];
const CHANGE_HEADERS = ['日付', '曜日', '種別', '対象レッスン', '変更後 開始', '変更後 終了', '変更後 レッスン名', 'LP表示メッセージ', 'LP掲載'];
const CHANGE_MAX_ROWS = 500;

function setupChangeSheetIfMissing() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ensureLessonSheetLayout_(ss);
  if (!ss.getSheetByName(CHANGE_SHEET_NAME)) {
    setupChangeSheet_(ss, true);
  }
  refreshChangeTargetValidation_(ss);
}

function setupChangeSheet_(ss, seed) {
  const sheet = ss.insertSheet(CHANGE_SHEET_NAME);
  sheet.getRange(1, 1, 1, CHANGE_HEADERS.length).setValues([CHANGE_HEADERS])
    .setFontWeight('bold').setBackground('#008374').setFontColor('#ffffff');
  sheet.setFrozenRows(1);

  sheet.getRange(2, 1, CHANGE_MAX_ROWS, 1).setNumberFormat('yyyy/mm/dd');
  sheet.getRange(2, 1, CHANGE_MAX_ROWS, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireDate().setAllowInvalid(false).build());
  sheet.getRange(2, 2).setFormula('=ARRAYFORMULA(IF(A2:A="","",MID("日月火水木金土",WEEKDAY(A2:A),1)))');
  sheet.getRange(2, 3, CHANGE_MAX_ROWS, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(CHANGE_TYPES, true).setAllowInvalid(false).build());
  sheet.getRange(2, 5, CHANGE_MAX_ROWS, 2).setNumberFormat('@');
  sheet.getRange(2, 9, CHANGE_MAX_ROWS, 1).insertCheckboxes();

  sheet.setColumnWidth(1, 100);
  sheet.setColumnWidth(2, 50);
  sheet.setColumnWidth(3, 110);
  sheet.setColumnWidth(4, 300);
  sheet.setColumnWidth(5, 90);
  sheet.setColumnWidth(6, 90);
  sheet.setColumnWidth(7, 220);
  sheet.setColumnWidth(8, 360);
  sheet.setColumnWidth(9, 70);

  sheet.getRange(1, 11, 9, 2).setValues([
    ['種別', '入力する項目'],
    ['休講', '日付・対象レッスン'],
    ['時間変更', '日付・対象レッスン・変更後 開始/終了'],
    ['レッスン変更', '日付・対象レッスン・変更後 レッスン名'],
    ['代行', '日付・対象レッスン・メッセージ（例：担当〇〇に変更）'],
    ['追加', '日付・変更後 開始/終了・変更後 レッスン名（対象レッスンは空欄）'],
    ['休館日', '日付のみ'],
    ['お知らせ', '日付・メッセージ（その日の上部に表示）'],
    ['LP掲載', 'チェックを外すとLPに表示しません']
  ]);
  sheet.getRange(1, 11, 1, 2).setFontWeight('bold').setBackground('#f3f4f6');
  sheet.setColumnWidth(11, 110);
  sheet.setColumnWidth(12, 380);

  if (seed) {
    sheet.getRange(2, 1, 2, 1).setValues([[new Date(2026, 9, 9)], [new Date(2026, 9, 12)]]);
    sheet.getRange(2, 3, 2, 1).setValues([['休館日'], ['お知らせ']]);
    sheet.getRange(2, 8, 2, 1).setValues([['休館日'], ['12日(月)は特別スケジュールです。別紙をご確認ください。']]);
    sheet.getRange(2, 9, 2, 1).setValues([[true], [true]]);
  }
  return sheet;
}

function refreshChangeTargetValidation_(ss) {
  const changeSheet = ss.getSheetByName(CHANGE_SHEET_NAME);
  if (!changeSheet) return;

  const labels = lessonsFrom_(collectMonthRows_(ss)).map(lessonLabel_);
  const unique = labels.filter(function(v, i) { return labels.indexOf(v) === i; });
  if (unique.length === 0) return;
  changeSheet.getRange(2, 4, CHANGE_MAX_ROWS, 1).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(unique, true).setAllowInvalid(true).build());
}

function lessonLabel_(l) {
  return l.day + ' ' + l.start + ' ' + l.name;
}

function cellToTime_(v) {
  if (v instanceof Date) return Utilities.formatDate(v, 'Asia/Tokyo', 'H:mm');
  return normTime_(v) || String(v || '').trim();
}

function readChanges_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  return sheet.getRange(2, 1, lastRow - 1, CHANGE_HEADERS.length).getValues()
    .filter(function(r) { return r[0] instanceof Date && r[2] && r[8] === true; })
    .map(function(r) {
      const target = String(r[3] || '').trim();
      const parts = target.split(' ');
      return {
        date: Utilities.formatDate(r[0], 'Asia/Tokyo', 'yyyy-MM-dd'),
        weekday: String(r[1] || ''),
        type: String(r[2]),
        target: target ? { day: parts[0], start: parts[1] || '', name: parts.slice(2).join(' ') } : null,
        newStart: cellToTime_(r[4]),
        newEnd: cellToTime_(r[5]),
        newName: String(r[6] || '').trim(),
        message: String(r[7] || '').trim()
      };
    });
}

function ensureHeader_(sheet, header) {
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  if (headers.indexOf(header) === -1) {
    sheet.getRange(1, lastCol + 1).setValue(header);
  }
}

/**
 * LP向けデータ（doGet?action=lessons）
 */
function getLessonData() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const changeSheet = ss.getSheetByName(CHANGE_SHEET_NAME);
  const today = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd');
  ensureLessonSheetLayout_(ss);
  const rows = collectMonthRows_(ss);
  return {
    result: 'success',
    today: today,
    bookingUntil: bookingLimit_(today),
    lessons: lessonsFrom_(rows),
    notes: notesFrom_(rows),
    blocked: blockedFrom_(rows).filter(function(b) { return b.date >= today; }),
    changes: changeSheet ? readChanges_(changeSheet).filter(function(c) { return c.date >= today; }) : []
  };
}
