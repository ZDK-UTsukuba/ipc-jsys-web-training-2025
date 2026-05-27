# Web 研修 2025 — ドキュざうるす（Astro Starlight サイト）

このディレクトリには、リポジトリ直下にある `day1/` 〜 `day3/` の研修資料を
[Astro Starlight](https://starlight.astro.build) で 1 つのドキュメントサイト
として閲覧できるよう再構成したものが入っています。

## 開発

```bash
cd site
npm install
npm run dev      # http://localhost:4321/
npm run build    # 静的サイトを dist/ に出力
npm run preview  # ビルド成果物をプレビュー
```

## 構成

- `src/content/docs/index.mdx` — トップページ
- `src/content/docs/dayN/...` — 各日・各フェーズの資料（Markdown / MDX）
- `src/content/docs/dayN/phaseM/_images/` — 画像（元 `handouts/_images` を移植）
- `public/pdfs/` — PDF 配布資料（Day 1 Phase 2 / Day 2 Phase 0・1）
- `astro.config.mjs` — サイドバー定義などの設定

## ソース対応

| サイトのページ | 元ファイル |
| --- | --- |
| `/day1/phase1/...` | `day1/phase1/handouts/*.md` |
| `/day1/phase2/` | `day1/phase2/handouts/main.pdf`（埋め込み） |
| `/day1/phase3/...` | `day1/phase3/handouts/*.md` |
| `/day2/phase0/` | `day2/phase0/handouts/main.pdf`（埋め込み） |
| `/day2/phase1/` | `day2/phase1/handouts/main.pdf`（埋め込み） |
| `/day3/phase1/...` | `day3/phase1/handouts/*.md` |
