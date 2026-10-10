# Google Apps Script（GAS）バックエンド

`index.html` から送信されるフォームデータを受け取り、スプレッドシート記録・メール送信を行うスクリプトです。

## ファイル構成

| ファイル | 説明 |
|---------|------|
| `Code.gs` | メイン処理（doPost、予約検索、キャンセル、メール送信） |
| `Lessons.gs` | 「レッスン一覧」シートへの月間スケジュール書き込み |

このフォルダはスプレッドシートのバインドスクリプト（`.clasp.json`）と紐づいています。`gas/` で `clasp push` するとエディタ（HEAD）に反映されます。本番 Web アプリ（デプロイ @21）は別途デプロイしない限り変わりません。
| `StyleManager.gs` | ※別管理。`applySheetStyle` / `applyStyleToAllSheets` を定義（本リポジトリには未同梱） |

## デプロイ先

`index.html` 内の Web アプリ URL と一致させてください。

```
https://script.google.com/macros/s/AKfycbxpNqcHdCq9uWHWsPminPZPXxgMkY3JbPw5WK3nKZyZU2MyBWdE0lnoBA8LCwcAVvHZ/exec
```

## v2 予約ページ

- ページ: `/v2/`（https://yogahibarigaoka-page.vercel.app/v2/）
- Web アプリ: デプロイ `AKfycbw_bG0_...`（@22 以降、v2 専用）。本番 `/`（@21）とは別デプロイ
- `doGet?action=lessons` で「レッスン一覧」「休講・変更」と予約数を返す
- 体験・休会中予約は `lesson_slot`（`yyyy-MM-dd H:mm`）付きで送信し、予約不可・休講・受付期間外（今日〜翌月同日の前日）は doPost で拒否

## レッスン一覧（2か月表示・月切り替え式）

- 1〜50行目が1つ目の月（A1で選択）、51〜100行目が2つ目の月（A51で選択）。切り替え前の内容は非表示シート「月別データ（編集不要）」に保存（表示中の月は同シートP1/Q1）
- 各ブロック: A〜G列 レッスン（定員なし）／L〜W列 予約不可・休講・時間変更（M〜R列はレッスン表A〜F列と同じ並びで貼り付け可。種別空欄＝予約不可、開始・終了が空欄なら終日）／Y〜Z列 営業時間
- G51 のチェックで上の月のレッスン・営業時間を下の月へコピー（予約不可はコピーしない）
- LP は「月別データ」の全月＋表示中の2か月（レッスン一覧の内容）を読む

## formType 対応表（index.html ↔ GAS）

| index.html `formType` | スプレッドシートシート名 |
|----------------------|-------------------------|
| `trial_lesson` | 体験予約フォーム |
| `pilates_reformer` | ピラティスリフォーマーレッスンご予約 |
| `hiatus_lesson` | 休会中1回受講予約 |
| `lost_found` | 忘れ物お問い合わせ |
| `self_este_consent` | セルフエステ同意書 |
| `cancel_request` | キャンセル申請 |
| `membership_card` | 会員証発行（※別フォーム用。index.html には未実装） |

## 取り消し線が下の行に伝染する問題

キャンセル行の直下に新しい予約が `appendRow` で追加されると、Google スプレッドシートの仕様で**直上の行の書式（取り消し線）が引き継がれる**ことがあります。

`Code.gs` では新規行追記後に `resetRowFormatting` で書式をリセットするよう対応済みです。  
既に誤って取り消し線が入っている行（例：星雅美さん 6/15 の予約）は、スプレッドシート上で手動解除が必要です。

## 注意（index.html との差分）

キャンセルフォームは `cancel_reservations_json`（複数予約の JSON）を送信します。  
`processCancellation` は JSON 対応済みです（`markRowAsCancelled` で該当行のみグレーアウト）。

自動返信メールの「ピラティス」表記を LP と揃える場合は、`sendConfirmationEmailToCustomer` 内の件名・本文を編集してください（スプレッドシートのシート名は変更不要）。
