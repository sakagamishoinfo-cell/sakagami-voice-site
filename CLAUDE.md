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
└── CLAUDE.md           # このファイル
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

## 開発メモ
- ローカル（`file://`プロトコル）ではYouTube埋め込みが表示されない。テスト時はHTTPサーバーを使う
  - `python -m http.server 8080` でローカルサーバー起動
- `favicon.png` と `apple-touch-icon.png` は未作成（SVGファビコン対応ブラウザでは問題なし）
