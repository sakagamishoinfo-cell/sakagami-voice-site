# 坂上晶 声優ポートフォリオサイト

## プロジェクト概要
声優・坂上晶（Sho Sakagami）のポートフォリオサイト。
白を基調としたさわやかなデザインで、プロフィール・ボイスサンプル・活動実績・料金・お問い合わせを掲載。

## 公開URL
- サイト: https://sakagami-voice.com/
- X (Twitter): https://x.com/sakagamisho

## ファイル構成
```
ホームページ/
├── index.html          # メインページ（HTML/CSS/JS一体型）
├── privacy.html        # プライバシーポリシーページ
├── faq.html            # よくある質問（Q&A形式）
├── guide.html          # セリフカウンター使い方ガイド
├── training.html       # 声優を目指す方へ（発声・滑舌トレーニング）
├── glossary.html       # 声優・ナレーション用語集（JS検索フィルタ付き）
├── favicon.svg         # ファビコン（SVG、黒背景に白"S"）
├── favicon.png         # ファビコン（PNG）※未作成
├── apple-touch-icon.png # Apple用アイコン ※未作成
├── images/
│   └── profile.jpg     # プロフィール写真
├── CLAUDE.md           # このファイル
├── tools/
│   └── serifu-counter/
│       └── index.html  # セリフカウンター（AI解析版）
└── workers/
    └── serifu-counter-api/
        ├── wrangler.toml   # Cloudflare Worker設定
        └── src/
            └── index.js    # Gemini APIプロキシ
```

## 技術構成
- **構成**: 単一HTMLファイル（CSS・JavaScript埋め込み）
- **フォント**: Cormorant Garamond（見出し）、Noto Sans JP（本文）
- **アニメーション**: IntersectionObserverによるスクロール表示アニメーション
- **レスポンシブ**: モバイル対応（ハンバーガーメニュー）
- **お問い合わせ**: Formspree（サーバーレスフォーム送信）
- **動画埋め込み**: YouTube（youtube-nocookie.com経由）

## セクション構成（index.html）
1. Hero（トップビジュアル）
2. Profile（プロフィール）
3. Voice Sample（ボイスサンプル - YouTube埋め込み）
4. Featured（注目の活動 - Arcanamuzica）
5. Works（出演実績）
6. Pricing（料金）
7. Contact（お問い合わせフォーム）
8. Footer

## カラーテーマ（CSS変数） — ダークフォレスト
```css
:root {
    --accent: #6fbf8a;        /* アクセントカラー（緑系） */
    --accent-light: #8dd4a4;
    --accent-dark: #4a9e6a;
    --bg-primary: #1e2a1f;    /* 背景（深い森の緑） */
    --bg-secondary: #253128;
    --bg-card: #2a3a2d;
    --bg-forest: #162018;
    --text-primary: #e8e3d9;  /* テキスト（温かみのあるオフホワイト） */
    --text-secondary: #c4bfb3;
    --text-dim: #8a8578;
    --text-on-dark: #e8e3d9;
    --gold: #d4ad6a;
    --border: rgba(255,255,255,0.08);
}
```

## 外部サービス連携
- **Formspree**: フォームID `mzdagpov`、送信先 `sakagamisho.info@gmail.com`
  - 無料プラン: 月50件まで
- **YouTube**: 動画ID `wvSAV-wtoto`（限定公開ボイスサンプル）
  - `youtube-nocookie.com` + `referrerpolicy="no-referrer-when-downgrade"`

## OGP / メタ情報
- OGP画像: `https://sakagami-voice.com/images/profile.jpg`
- Twitter Card: `summary_large_image`
- Twitter アカウント: `@sakagamisho`
- canonical URL: `https://sakagami-voice.com/`

## Git / バージョン管理
- **リポジトリ**: https://github.com/sakagamishoinfo-cell/sakagami-voice-site (Private)
- **ブランチ**: main
- **ローカルパス**: `C:\Users\s_sakagami\Desktop\声優・ポートフォリオ関連\ホームページ`
- **Git ユーザー名**: sakagamishoinfo-cell
- **Git メール**: sakagamisho.info@gmail.com
- コミットメッセージは日本語で記載
- 変更後は `git add` → `git commit` → `git push origin main`
- `git push origin main` で GitHub Actions が自動デプロイを実行（下記「ホスティング」参照）

## アカウント一覧（このサイトで使用しているサービス）
| サービス | アカウント | 用途 |
|---|---|---|
| **GitHub** | sakagamishoinfo-cell | ソースコード管理・CI/CD |
| **Cloudflare（ホスティング）** | Sakagamisho.info@gmail.com | sakagami-voice.com のホスティング・DNS |
| **Cloudflare（Worker）** | Sakagamisho.info@gmail.com ✅ 移行済み | セリフカウンターAPI（Gemini プロキシ） |
| **Google AdSense** | sakagamisho.info@gmail.com に移行予定（旧: s_sakagami@office-b.com を閉鎖中） | 広告収益化 |
| **Google Search Console** | sakagamisho.info@gmail.com ✅ 移行済み | SEO・検索パフォーマンス |
| **Formspree** | sakagamisho.info@gmail.com | お問い合わせフォーム |

## ホスティング（本番デプロイ）
- **ホスティング**: Cloudflare Pages
- **Cloudflareアカウント**: Sakagamisho.info@gmail.com
- **Account ID**: `dddb6ca62946e48960f80d0cfbe64ade`
- **ドメイン**: sakagami-voice.com（Active / Free プラン）
- **DNS**: ネームサーバーは `may.ns.cloudflare.com` / `nero.ns.cloudflare.com`
- **注意**: Worker・Pages両方とも同一アカウント（Sakagamisho.info@gmail.com）
- **Pagesプロジェクト名**: `shrill-sunset-90f6`（Workers with Assets 形式）
- **Cloudflare APIトークン**: `CBrO6VxaeEa51je4T4PfDQxYh982HEeeVAYnmSdy`
- **デプロイ方法**: GitHub Actions 自動デプロイ（`.github/workflows/deploy.yml`）
  - `git push origin main` → 自動で Cloudflare Pages にデプロイ
  - GitHub Secrets: `CLOUDFLARE_API_TOKEN`, `CLOUDFLARE_ACCOUNT_ID` 設定済み
  - 手動デプロイも可能（wrangler deploy）
- **公開ファイル一覧**（デプロイ対象）:
  - index.html, privacy.html, faq.html, guide.html, training.html, glossary.html, favicon.svg
  - sitemap.xml, robots.txt
  - images/profile.jpg
  - tools/serifu-counter/index.html
- **除外ファイル**: CLAUDE.md, .git/, .gitignore, workers/

## Google AdSense
- **Googleアカウント**: s_sakagami@office-b.com
- **Publisher ID**: `ca-pub-1795325754113531`
- **登録サイト**: sakagami-voice.com
- **状態**: サイト所有権確認OK（2026-02-24）→ 審査リクエスト待ち
- **AdSenseスクリプト設置済みファイル**: index.html, privacy.html, tools/serifu-counter/index.html
- **広告ユニット**（セリフカウンター内）:
  - ヘッダー広告スペース
  - 結果エリア下部の広告スペース
  - インタースティシャル広告（結果表示前、3秒カウントダウン）

## セリフカウンター（/tools/serifu-counter/）
声優・ナレーター向けの台本文字数カウントツール。
- **URL**: https://sakagami-voice.com/tools/serifu-counter/
- **解析方式**: AI解析のみ（Gemini 2.5 Flash）— 正規表現は使わない
- **アーキテクチャ**: ブラウザ → Cloudflare Worker（プロキシ） → Gemini API
- **対応入力**: テキスト貼り付け、Excel(.xlsx)、Word(.docx)、テキストファイル
- **外部ライブラリ**: SheetJS (xlsx.js)、mammoth.js
- **機能**: セリフ/ト書き分類、役名別内訳、推定読み上げ時間（3段階速度）
- **読み上げ速度**: ゆったり280字/分、普通380字/分、スピーディー480字/分

## Cloudflare Worker（serifu-counter-api）
Gemini APIキーを隠すためのサーバーレスプロキシ。
- **Worker URL**: https://serifu-counter-api.sakagamisho-info.workers.dev
- **Cloudflareアカウント**: Sakagamisho.info@gmail.com ✅ 移行済み
- **Account ID**: dddb6ca62946e48960f80d0cfbe64ade
- **モデル**: gemini-2.5-flash（responseMimeType: application/json）
- **Secret**: `GEMINI_API_KEY`（wrangler secret putで設定済み）
- **CORS許可オリジン**: sakagami-voice.com, localhost:8080, 127.0.0.1:8080
- **デプロイ**: `CLOUDFLARE_API_TOKEN=<token> npx wrangler deploy`（workers/serifu-counter-api/ディレクトリから）
- **テキスト上限**: 10万文字

## 開発メモ
- ローカル（`file://`プロトコル）ではYouTube埋め込みが表示されない。テスト時はHTTPサーバーを使う
  - `python -m http.server 8080` でローカルサーバー起動
- `favicon.png` と `apple-touch-icon.png` は未作成（SVGファビコン対応ブラウザでは問題なし）
