# Google Apps Script（GAS）バックエンド

`index.html` から送信されるフォームデータを受け取り、スプレッドシート記録・メール送信を行うスクリプトです。

## ファイル構成

| ファイル | 説明 |
|---------|------|
| `Code.gs` | メイン処理（doPost、予約検索、キャンセル、メール送信） |
| `StyleManager.gs` | ※別管理。`applySheetStyle` / `applyStyleToAllSheets` を定義（本リポジトリには未同梱） |

## デプロイ先

`index.html` 内の Web アプリ URL と一致させてください。

```
https://script.google.com/macros/s/AKfycbxpNqcHdCq9uWHWsPminPZPXxgMkY3JbPw5WK3nKZyZU2MyBWdE0lnoBA8LCwcAVvHZ/exec
```

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

## 注意（index.html との差分）

キャンセルフォームは `cancel_reservations_json`（複数予約の JSON）を送信しますが、  
現在の `processCancellation` は `targetSheet` / `targetRow` の単一指定を想定しています。  
複数選択キャンセルで元シートのグレーアウトまで行う場合は、GAS 側の `processCancellation` を JSON 対応に更新する必要があります。

自動返信メールの「ピラティス」表記を LP と揃える場合は、`sendConfirmationEmailToCustomer` 内の件名・本文を編集してください（スプレッドシートのシート名は変更不要）。
