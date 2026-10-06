/**
 * レッスン一覧シートへ月間スタジオプログラムを書き込む
 * 手動実行: importLessonList
 * レッスン一覧が空のときは onOpen から自動で書き込まれる
 */

const LESSON_SHEET_NAME = 'レッスン一覧';
const LESSON_MONTH = '2026-10';

const COLOR = {
  orange: '#ED7D31',
  blue: '#1F9BB8',
  magenta: '#E61EDC',
  green: '#00B050',
  gray: '#A6A6A6',
  yellow: '#FFD966'
};

const PILATES_NOTE = '※リフォーマー会員様のみご参加可能／滑り止め靴下必須';
const LAVA_NOTE = '※温度湿度が低い場合がございます。';

// [曜日, 開始, 終了, レッスン名, 強度, 定員, 備考, 色]
const LESSONS = [
  ['月', '10:00', '10:45', 'フローヨガ', '★★', '', '', 'orange'],
  ['月', '11:15', '12:00', 'アシュタンガヨガ', '★★★', '', '', 'magenta'],
  ['月', '12:30', '13:15', 'ゆるふわデトックスヨガ', '★', '', '※26日ご予約済パーソナル', 'blue'],
  ['月', '15:00', '16:00', 'マシンピラティス トータルボディメイク', '★', 6, PILATES_NOTE, 'green'],
  ['月', '16:30', '17:30', 'パーソナル（要予約・有料）', '', 1, '1週間前までに予約フォームにてご予約下さい。' + PILATES_NOTE, 'yellow'],
  ['月', '18:45', '19:45', 'マシンピラティス 姿勢美人', '★★', 6, PILATES_NOTE + '／※5日ご予約済パーソナル', 'green'],
  ['月', '20:15', '21:15', 'マシンピラティス 桃尻メイク', '★★★', 6, PILATES_NOTE, 'green'],

  ['火', '10:00', '11:00', 'マシンピラティス お腹引き締め', '★★★', 6, PILATES_NOTE, 'green'],
  ['火', '11:30', '12:30', 'マシンピラティス ベーシック', '★★', 6, PILATES_NOTE, 'green'],
  ['火', '13:30', '14:15', '溶岩浴', '', '', LAVA_NOTE + '／27日プロジェクターレッスン', 'gray'],
  ['火', '14:45', '15:30', '整えるヨガ', '★★', '', LAVA_NOTE, 'orange'],
  ['火', '16:00', '16:45', 'ホイールで体幹アップヨガ', '★★★', 11, LAVA_NOTE, 'magenta'],
  ['火', '19:15', '20:00', 'リンパヨガ', '★', '', '', 'blue'],
  ['火', '20:30', '21:15', '骨盤コンディショニング', '★★', '', '', 'orange'],

  ['水', '10:00', '10:45', '股関節を緩めるヨガ', '★', '', '', 'blue'],
  ['水', '11:15', '12:00', '骨盤調整ヨガ', '★★', '', '', 'orange'],
  ['水', '12:45', '13:30', '溶岩浴', '', '', '', 'gray'],
  ['水', '14:00', '14:45', 'ウェルエイジングヨガ', '★★', '', '', 'orange'],
  ['水', '15:15', '16:15', '眠活ヨガ', '★', '', '7日プロジェクターレッスン', 'blue'],
  ['水', '16:45', '17:30', '溶岩浴', '', '', '', 'gray'],
  ['水', '19:15', '20:00', 'からだ調整ヨガ', '★★', '', '', 'orange'],
  ['水', '20:30', '21:15', 'リラックスヨガ', '★', '', '', 'blue'],

  ['木', '10:00', '10:45', '猫背&ネックリリースヨガ', '★', '', '※15日はイベントレッスン（要確認）', 'blue'],
  ['木', '11:15', '12:15', '腰すっきりヨガ', '★★', '', '', 'orange'],
  ['木', '12:45', '13:30', '美脚・美尻ヨガ', '★★', '', '', 'orange'],
  ['木', '14:00', '14:45', 'からだほぐしヨガ', '★', '', '', 'blue'],
  ['木', '15:15', '16:00', '胸郭解放ヨガ', '★★', 8, '', 'orange'],
  ['木', '18:00', '18:45', '溶岩浴', '', '', '', 'gray'],
  ['木', '19:15', '20:00', 'ビギナーヨガ', '★', '', '', 'blue'],
  ['木', '20:30', '21:15', 'ヴィンヤサフロー', '★★★', '', '', 'magenta'],

  ['金', '15:30', '16:30', 'マシンピラティス 魅せるバック&アームズ Ver.2', '★★', 6, PILATES_NOTE + '／※2日ご予約済パーソナル', 'green'],
  ['金', '17:00', '18:00', 'マシンピラティス チェストオープン', '★★', 6, PILATES_NOTE, 'green'],
  ['金', '18:30', '19:30', 'マシンピラティス トータルボディメイク', '★', 6, PILATES_NOTE, 'green'],
  ['金', '20:00', '21:00', 'マシンピラティス お腹引き締め', '★★★', 6, PILATES_NOTE, 'green'],

  ['土', '9:30', '10:15', 'からだ調整ヨガ', '★★', '', '', 'orange'],
  ['土', '10:45', '11:30', 'リフレッシュヨガ', '★', '', '', 'blue'],
  ['土', '12:15', '13:00', 'フローヨガ', '★★', '', '', 'orange'],
  ['土', '13:30', '14:15', 'ベーシックヨガ', '★', '', '', 'blue'],
  ['土', '14:45', '15:30', 'スプリットヨガ', '★★★', '', '3日プロジェクターレッスン', 'magenta'],
  ['土', '16:00', '17:00', 'ゆるめるストレッチヨガ', '★', '', '※10日ご予約済パーソナル', 'blue'],

  ['日', '9:30', '10:15', '艶美ヨガ（要確認）', '★★★', '', '', 'magenta'],
  ['日', '10:45', '11:45', 'ゼロコア', '★★', '', '', 'orange'],
  ['日', '12:30', '13:15', 'リラックスヨガ', '★', '', '', 'blue'],
  ['日', '13:45', '14:30', 'フローヨガ', '★★', '', '', 'orange'],
  ['日', '15:00', '15:45', '快眠ヨガ', '★', '', '', 'blue'],
  ['日', '16:15', '17:00', 'アンチエイジングヨガ', '★★', '', '', 'orange']
];

const MONTH_NOTES = [
  ['対象月', '2026年10月'],
  ['休館日', '9日(金)'],
  ['特別スケジュール', '12日(月)は別紙をご確認ください'],
  ['営業時間（月〜木）', '9:30〜22:00'],
  ['営業時間（金）', '15:00〜21:30'],
  ['営業時間（土日）', '9:00〜17:30'],
  ['Aroma day（ラベンダー）', '8日(木)・10日(土)・15日(木)・19日(月)・25日(日)'],
  ['強度', '★初級／★★中級／★★★上級'],
  ['パーソナル', '要予約のリフォーマーパーソナルレッスンは、1週間前までにご予約が入らなければマシンピラティスグループレッスンへ変更になります。'],
  ['他店舗会員', '他店舗会員様はマシンピラティスをご受講いただけません。'],
  ['定休', '毎月第2金曜日は休館日です。変更がある月は店舗ホームページ「会員様へのお知らせ」にてご確認ください。'],
  ['発券', 'レッスン開始20分前から5分前までにご来館いただき、発券をお済ませください。定員数が変更になるレッスンもございます。'],
  ['リフォーマー環境', 'ピラティスリフォーマーレッスン時は温度低め・湿度低め設定です。']
];

function toMinutes_(hhmm) {
  const parts = hhmm.split(':');
  return Number(parts[0]) * 60 + Number(parts[1]);
}

function importLessonListIfEmpty() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(LESSON_SHEET_NAME);
  if (sheet && sheet.getLastRow() >= 2) return;
  importLessonList(ss);
}

function importLessonList(targetSpreadsheet) {
  const ss = targetSpreadsheet || SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(LESSON_SHEET_NAME);
  if (!sheet) sheet = ss.insertSheet(LESSON_SHEET_NAME);
  sheet.clear();

  const headers = ['対象月', '曜日', '開始', '終了', '分数', 'レッスン名', '強度', '定員', '備考', '色'];
  const rows = LESSONS.map(function(l) {
    return [LESSON_MONTH, l[0], l[1], l[2], toMinutes_(l[2]) - toMinutes_(l[1]), l[3], l[4], l[5], l[6], l[7]];
  });

  sheet.getRange(1, 1, rows.length + 1, headers.length).setNumberFormat('@');
  sheet.getRange(1, 1, 1, headers.length).setValues([headers])
    .setFontWeight('bold').setBackground('#008374').setFontColor('#ffffff');
  sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);
  sheet.getRange(2, 5, rows.length, 1).setNumberFormat('0');
  sheet.getRange(2, 8, rows.length, 1).setNumberFormat('0');

  const nameBgs = rows.map(function(r) { return [COLOR[r[9]] || '#ffffff']; });
  const nameFonts = rows.map(function(r) { return [r[9] === 'yellow' ? '#000000' : '#ffffff']; });
  sheet.getRange(2, 6, rows.length, 1).setBackgrounds(nameBgs).setFontColors(nameFonts).setFontWeight('bold');

  const noteCol = headers.length + 2;
  sheet.getRange(1, noteCol, 1, 2).setValues([['項目', '内容']])
    .setFontWeight('bold').setBackground('#008374').setFontColor('#ffffff');
  sheet.getRange(2, noteCol, MONTH_NOTES.length, 2).setValues(MONTH_NOTES).setWrap(true);

  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
  sheet.setColumnWidth(9, 360);
  sheet.setColumnWidth(noteCol, 160);
  sheet.setColumnWidth(noteCol + 1, 420);
  sheet.getRange(2, 9, rows.length, 1).setWrap(true);

  refreshChangeTargetValidation_(ss);
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
  const lessonSheet = ss.getSheetByName(LESSON_SHEET_NAME);
  if (!changeSheet || !lessonSheet || lessonSheet.getLastRow() < 2) return;

  const labels = readLessons_(lessonSheet).map(lessonLabel_);
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
  return String(v || '').trim().replace('：', ':');
}

function readLessons_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  return sheet.getRange(2, 1, lastRow - 1, 10).getValues()
    .filter(function(r) { return r[1] && r[2] && r[5]; })
    .map(function(r) {
      const month = r[0] instanceof Date ? Utilities.formatDate(r[0], 'Asia/Tokyo', 'yyyy-MM') : String(r[0]).trim();
      return {
        month: month,
        day: String(r[1]).trim(),
        start: cellToTime_(r[2]),
        end: cellToTime_(r[3]),
        minutes: Number(r[4]) || '',
        name: String(r[5]).trim(),
        intensity: String(r[6] || ''),
        capacity: r[7] === '' ? '' : Number(r[7]) || String(r[7]),
        note: String(r[8] || ''),
        color: String(r[9] || '')
      };
    });
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

function readNotes_(sheet) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return [];
  return sheet.getRange(2, 12, lastRow - 1, 2).getValues()
    .filter(function(r) { return r[0] && r[1]; })
    .map(function(r) { return { label: String(r[0]), value: String(r[1]) }; });
}

/* ===============================================================
 * 予約数カウント（v2予約ページ）
 * =============================================================== */

const BOOKING_SHEETS = ['体験予約フォーム', '休会中1回受講予約'];
const WEEKDAY_CHARS = ['日', '月', '火', '水', '木', '金', '土'];

function ensureHeader_(sheet, header) {
  const lastCol = Math.max(sheet.getLastColumn(), 1);
  const headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  if (headers.indexOf(header) === -1) {
    sheet.getRange(1, lastCol + 1).setValue(header);
  }
}

/**
 * { 'yyyy-MM-dd H:mm': 予約数 } を返す（キャンセル申請済みは除外）
 */
function countBookings_(ss, fromDate) {
  const counts = {};
  BOOKING_SHEETS.forEach(function(name) {
    const sheet = ss.getSheetByName(name);
    if (!sheet || sheet.getLastRow() < 2) return;
    const values = sheet.getDataRange().getValues();
    const headers = values[0].map(String);
    const slotIdx = headers.indexOf('lesson_slot');
    if (slotIdx === -1) return;
    const remarkIdxs = headers.map(function(h, i) { return (h.indexOf('備考') !== -1 || h === 'remarks') ? i : -1; })
      .filter(function(i) { return i !== -1; });

    for (let r = 1; r < values.length; r++) {
      const slot = String(values[r][slotIdx] || '').trim();
      if (!slot || (fromDate && slot.slice(0, 10) < fromDate)) continue;
      const cancelled = remarkIdxs.some(function(i) {
        return String(values[r][i]).indexOf('【キャンセル申請あり】') !== -1;
      });
      if (cancelled) continue;
      counts[slot] = (counts[slot] || 0) + 1;
    }
  });
  return counts;
}

function findCapacity_(ss, slot) {
  const lessonSheet = ss.getSheetByName(LESSON_SHEET_NAME);
  if (!lessonSheet) return null;
  const date = slot.slice(0, 10);
  const start = slot.slice(11);
  const d = new Date(date + 'T00:00:00+09:00');
  const day = WEEKDAY_CHARS[Number(Utilities.formatDate(d, 'Asia/Tokyo', 'u')) % 7];
  const month = date.slice(0, 7);
  const lesson = readLessons_(lessonSheet).filter(function(l) {
    return l.month === month && l.day === day && l.start === start;
  })[0];
  return lesson && typeof lesson.capacity === 'number' ? lesson.capacity : null;
}

function isSlotFull_(ss, slot) {
  const capacity = findCapacity_(ss, slot);
  if (capacity === null) return false;
  const counts = countBookings_(ss, slot.slice(0, 10));
  return (counts[slot] || 0) >= capacity;
}

/**
 * LP向けデータ（doGet?action=lessons）
 */
function getLessonData() {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  const lessonSheet = ss.getSheetByName(LESSON_SHEET_NAME);
  const changeSheet = ss.getSheetByName(CHANGE_SHEET_NAME);
  const today = Utilities.formatDate(new Date(), 'Asia/Tokyo', 'yyyy-MM-dd');
  return {
    result: 'success',
    today: today,
    lessons: lessonSheet ? readLessons_(lessonSheet) : [],
    notes: lessonSheet ? readNotes_(lessonSheet) : [],
    changes: changeSheet ? readChanges_(changeSheet).filter(function(c) { return c.date >= today; }) : [],
    bookings: countBookings_(ss, today)
  };
}
