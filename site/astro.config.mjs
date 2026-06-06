import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

export default defineConfig({
  site: "https://example.com",
  integrations: [
    starlight({
      title: "jsys Web 研修 2026",
      description:
        "IPC / jsys 合同 Web 研修 2025 — HTML / CSS / JavaScript / TypeScript / React",
      defaultLocale: "root",
      locales: {
        root: { label: "日本語", lang: "ja" },
      },
      social: {
        github: "https://github.com/sohosai/web-training-2026",
      },
      customCss: ["./src/styles/custom.css"],
      lastUpdated: true,
      sidebar: [
        {
          label: "はじめに",
          items: [{ label: "ようこそ", link: "/" }],
        },
        {
          label: "フロントエンド",
          items: [
            { label: "はじめに", slug: "frontend" },
            {
              label: "Day 1 — HTML / CSS / JavaScript",
              items: [
                { label: "Day 1 概要", slug: "frontend/day1" },
                {
                  label: "Phase 1 — HTML",
                  collapsed: false,
                  items: [
                    { label: "はじめに", slug: "frontend/day1/phase1" },
                    {
                      label: "1. HTML とは",
                      slug: "frontend/day1/phase1/01-html-toha",
                    },
                    {
                      label: "2. HTML を構成する要素",
                      slug: "frontend/day1/phase1/02-html-elements",
                    },
                    { label: "3. 演習", slug: "frontend/day1/phase1/03-enshu" },
                  ],
                },
                {
                  label: "Phase 2 — CSS",
                  items: [{ label: "はじめに", slug: "frontend/day1/phase2" }],
                },
                {
                  label: "Phase 3 — JavaScript",
                  collapsed: true,
                  items: [
                    { label: "はじめに", slug: "frontend/day1/phase3" },
                    {
                      label: "1. はじめに",
                      slug: "frontend/day1/phase3/01-hajimeni",
                    },
                    {
                      label: "2. 数値演算",
                      slug: "frontend/day1/phase3/02-suuchi-enzan",
                    },
                    {
                      label: "3. 文字列",
                      slug: "frontend/day1/phase3/03-mojiretsu",
                    },
                    {
                      label: "4. 変数",
                      slug: "frontend/day1/phase3/04-hensuu",
                    },
                    {
                      label: "5. 配列",
                      slug: "frontend/day1/phase3/05-hairetsu",
                    },
                    {
                      label: "6. オブジェクト",
                      slug: "frontend/day1/phase3/06-object",
                    },
                    {
                      label: "7. 制御構文",
                      slug: "frontend/day1/phase3/07-seigyo-koubun",
                    },
                    {
                      label: "8. 関数",
                      slug: "frontend/day1/phase3/08-kansuu",
                    },
                    { label: "9. DOM", slug: "frontend/day1/phase3/09-dom" },
                  ],
                },
              ],
            },
            {
              label: "Day 2 — シェル / TypeScript",
              items: [
                { label: "Day 2 概要", slug: "frontend/day2" },
                { label: "Phase 0 — シェル操作", slug: "frontend/day2/phase0" },
                { label: "Phase 1 — TypeScript", slug: "frontend/day2/phase1" },
              ],
            },
            {
              label: "Day 3 — React",
              items: [
                { label: "Day 3 概要", slug: "frontend/day3" },
                {
                  label: "Phase 1 — React",
                  collapsed: true,
                  items: [
                    { label: "はじめに", slug: "frontend/day3/phase1" },
                    {
                      label: "1. はじめに",
                      slug: "frontend/day3/phase1/01-hajimeni",
                    },
                    {
                      label: "2. 環境構築",
                      slug: "frontend/day3/phase1/02-kankyo-kouchiku",
                    },
                    {
                      label: "3. 概論",
                      slug: "frontend/day3/phase1/03-gairon",
                    },
                    { label: "4. TSX 1", slug: "frontend/day3/phase1/04-tsx1" },
                    {
                      label: "5. 状態",
                      slug: "frontend/day3/phase1/05-joutai",
                    },
                    { label: "6. TSX 2", slug: "frontend/day3/phase1/06-tsx2" },
                    {
                      label: "7. 副作用",
                      slug: "frontend/day3/phase1/07-fukusayou",
                    },
                    { label: "8. CSS", slug: "frontend/day3/phase1/08-css" },
                    { label: "9. 演習", slug: "frontend/day3/phase1/09-enshu" },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: "バックエンド",
          items: [
            { label: "はじめに", slug: "backend" },
            {
              label: "1章: 知っておきたい! 知識編",
              items: [
                { label: "1章 概要", slug: "backend/1-knowledge" },
                {
                  label:
                    "Phase 1: Webアプリケーションを俯瞰してみよう/バックエンドって何をしているの?",
                  slug: "backend/1-knowledge/phase1",
                },
                {
                  label: "Phase 2: バックエンドに使われる技術たち",
                  slug: "backend/1-knowledge/phase2",
                },
              ],
            },
            {
              label: "2章: 楽しい、楽しい 実践編",
              items: [
                { label: "2章 概要", slug: "backend/2-practice" },
                {
                  label: "Phase 1: 環境構築しよう",
                  slug: "backend/2-practice/phase1",
                },
                {
                  label: "Phase 2: リクエストを受けて適当なメッセージを返そう",
                  slug: "backend/2-practice/phase2",
                },
                {
                  label: "Phase 3: データベースを読んでみよう",
                  slug: "backend/2-practice/phase3",
                },
                {
                  label: "Phase 4: データベースに永続化しよう",
                  slug: "backend/2-practice/phase4",
                },
              ],
            },
            {
              label: "3章: 高度な話題! 発展編",
              items: [{ label: "3章 概要", slug: "backend/3-improve" }],
            },
          ],
        },
      ],
    }),
  ],
});
