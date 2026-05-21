@AGENTS.md

# NEXT BRINO サイト — プロジェクト概要

## 技術スタック
- **Next.js 16.2.6** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- フォント: `Noto Sans JP` / `Barlow Condensed` / `Cormorant Garamond`（Google Fonts）

## 起動方法
```bash
npm run dev   # 開発サーバー http://localhost:3000
npm run build # 本番ビルド
npm run start # 本番サーバー
```

## ディレクトリ構成
```
app/
  page.tsx              # メインページ（全セクション）← 編集の起点
  layout.tsx            # フォント設定・メタデータ
  globals.css           # アニメーション・共通スタイル
  components/
    CherryBlossoms.tsx  # 桜の花びらエフェクト（fixed overlay）
    NewsSection.tsx     # お知らせセクション（WP REST API連動）
    Ticker.tsx          # 横流れテキストバナー
  api/
    news/route.ts       # WordPress APIプロキシ（nextbrino.com/wp-json）
public/
  images/
    header-logo.png
    top-fv1.jpg / top-fv2.jpg / top-fv3.jpg
    kuroki-yuta.jpg
    contact.jpg
```

## ページ構成（上から順）

1. **ヘッダー** — ロゴのみ（`position: fixed`）
2. **FV（270vh sticky）** — 3枚スライドショー→スクロールで fv1 静止背景
3. **PHILOSOPHY** — ミッション／ビジョン／バリュー 3ボックス
4. **TOP MESSAGE** — 代表挨拶（Ticker付き）
5. **SERVICE** — 6事業カード（Ticker付き）
6. **NEWS** — WP REST API取得（Ticker付き）
7. **CONTACT** — contact.jpg 全幅リンク（Ticker付き）

## FV スクロールアニメーション（重要）

`page.tsx` の上部で管理する変数群：

| 変数 | 役割 |
|---|---|
| `rawProg` | `scrollY / (vh * 1.2)` で 0→1 |
| `progress` | `ease(rawProg)` ← i-ne.co.jp 式非線形イージング `1-(1-t)^1.7` |
| `darkOverlay` | 0.30→0（FV初期の文字読みやすさ確保） |
| `whiteOverlay` | 0→0.92（画像を白く漂白、全ページ背景に） |
| `textTop` | 50→84%（テキスト下端を画面下部に anchor） |
| `textTranslateY` | -50→-100%（bottom-anchor） |
| `textLeft` | 55→5%（右→左） |
| `textFontSizeVw` | 4.2→9.0vw（拡大） |

### 背景画像の制御
- **scrollY ≤ 80px**: 3枚スライドショー（Ken Burns有効）
- **scrollY > 80px**: `slideshowActive = false` → `slide = 0`（fv1固定）、Ken Burns 停止

### z-index スタック
```
z:1    固定FV画像（fv1.jpg、フルスクリーン常時表示）
z:2    暗オーバーレイ（scroll で消える）
z:3    白オーバーレイ（scroll で出現、画像を漂白）
z:10   FV stickyコンテナー（テキスト）
z:20   コンテンツセクション（透過、FV画像が全ページ背景）
z:999  マウスインジケーター（fixed・最下部で opacity:0）
z:1000 ヘッダー
```

## デザイン仕様

- **サイトカラー（navy）**: `#15263b`
- **ゴールドアクセント**: `#9d8c56`
- **FVフォント**: Cormorant Garamond（セリフ、i-ne.co.jp に近いスタイル）
- **サブフォント**: Noto Sans JP（本文・日本語）
- **Tickerフォント**: Barlow Condensed（大きく・薄くグラデーション）
- 背景: 白ベース。コンテンツセクションは `background: transparent` でFV画像が全体背景

## 参考サイト
- デザイン参考: https://i-ne.co.jp（スクロールアニメーション）
- スクロールティッカー参考: https://www.sanwa-paint.jp
- 本番サイト: https://nextbrino.com

## WordPress連携
- `app/api/news/route.ts` が `nextbrino.com/wp-json/wp/v2/posts` をプロキシ
- CORS対策済み。取得記事数 `per_page=50`

## よくある修正箇所

| やりたいこと | 変更ファイル |
|---|---|
| FVテキスト内容変更 | `app/page.tsx` の `<p>` タグ内 |
| スクロールアニメーション調整 | `app/page.tsx` の lerp/ease 変数群 |
| 各セクション内容変更 | `app/page.tsx` の各 `<section>` |
| ティッカーテキスト変更 | `app/page.tsx` の `<Ticker text="..." />` |
| ニュース取得件数変更 | `app/api/news/route.ts` の `per_page` |
| フォント追加 | `app/layout.tsx` + `app/globals.css` の `:root` |
| 桜エフェクト調整 | `app/components/CherryBlossoms.tsx` |
