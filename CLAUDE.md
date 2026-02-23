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

## カラーテーマ（CSS変数）
```css
:root {
    --accent: #6b9e7a;        /* アクセントカラー（緑系） */
    --accent-light: #4e8a60;
    --accent-dark: #8dbf9c;
    --bg-primary: #f9f8f5;    /* 背景（温かみのあるオフホワイト） */
    --bg-secondary: #f1efe9;
    --bg-card: #fdfcfa;
    --text-primary: #1a1a1a;  /* テキスト（はっきりした黒系） */
    --text-secondary: #3a3a3a;
    --text-dim: #5a5a5a;
    --gold: #b89856;
    --border: rgba(0,0,0,0.06);
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
- **リポジトリ**: https://github.com/ssakagami-commits/sakagami-voice-site (Private)
- **ブランチ**: main
- **ローカルパス**: `C:\Users\s_sakagami\Desktop\声優・ポートフォリオ関連\ホームページ`
- **Git ユーザー名**: ssakagami-commits
- **Git メール**: sakagamisho.info@gmail.com
- コミットメッセージは日本語で記載
- 変更後は `git add` → `git commit` → `git push origin main` で反映

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
- **Worker URL**: https://serifu-counter-api.hataraba-xai.workers.dev
- **Cloudflareアカウント**: Hataraba_xai@office-b.com
- **Account ID**: ec6340aad9db27a431496f9464de251a
- **モデル**: gemini-2.5-flash（responseMimeType: application/json）
- **Secret**: `GEMINI_API_KEY`（wrangler secret putで設定済み）
- **CORS許可オリジン**: sakagami-voice.com, localhost:8080, 127.0.0.1:8080
- **デプロイ**: `CLOUDFLARE_API_TOKEN=<token> npx wrangler deploy`（workers/serifu-counter-api/ディレクトリから）
- **テキスト上限**: 10万文字

## 開発メモ
- ローカル（`file://`プロトコル）ではYouTube埋め込みが表示されない。テスト時はHTTPサーバーを使う
  - `python -m http.server 8080` でローカルサーバー起動
- `favicon.png` と `apple-touch-icon.png` は未作成（SVGファビコン対応ブラウザでは問題なし）
