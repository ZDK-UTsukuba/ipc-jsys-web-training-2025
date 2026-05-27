import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

export default defineConfig({
  site: 'https://example.com',
  integrations: [
    starlight({
      title: 'Web 研修 2025 ドキュざうるす',
      description: 'IPC / jsys 合同 Web 研修 2025 — HTML / CSS / JavaScript / TypeScript / React',
      defaultLocale: 'root',
      locales: {
        root: { label: '日本語', lang: 'ja' },
      },
      social: {
        github: 'https://github.com/sohosai/web-training-2026',
      },
      customCss: ['./src/styles/custom.css'],
      lastUpdated: true,
      sidebar: [
        {
          label: 'はじめに',
          items: [{ label: 'ようこそ', link: '/' }],
        },
        {
          label: 'Day 1 — HTML / CSS / JavaScript',
          items: [
            { label: 'Day 1 概要', slug: 'day1' },
            {
              label: 'Phase 1 — HTML',
              collapsed: false,
              items: [
                { label: 'はじめに', slug: 'day1/phase1' },
                { label: '1. HTML とは', slug: 'day1/phase1/01-html-toha' },
                { label: '2. HTML を構成する要素', slug: 'day1/phase1/02-html-elements' },
                { label: '3. 演習', slug: 'day1/phase1/03-enshu' },
              ],
            },
            {
              label: 'Phase 2 — CSS',
              items: [{ label: 'はじめに', slug: 'day1/phase2' }],
            },
            {
              label: 'Phase 3 — JavaScript',
              collapsed: true,
              items: [
                { label: 'はじめに', slug: 'day1/phase3' },
                { label: '1. はじめに', slug: 'day1/phase3/01-hajimeni' },
                { label: '2. 数値演算', slug: 'day1/phase3/02-suuchi-enzan' },
                { label: '3. 文字列', slug: 'day1/phase3/03-mojiretsu' },
                { label: '4. 変数', slug: 'day1/phase3/04-hensuu' },
                { label: '5. 配列', slug: 'day1/phase3/05-hairetsu' },
                { label: '6. オブジェクト', slug: 'day1/phase3/06-object' },
                { label: '7. 制御構文', slug: 'day1/phase3/07-seigyo-koubun' },
                { label: '8. 関数', slug: 'day1/phase3/08-kansuu' },
                { label: '9. DOM', slug: 'day1/phase3/09-dom' },
              ],
            },
          ],
        },
        {
          label: 'Day 2 — シェル / TypeScript',
          items: [
            { label: 'Day 2 概要', slug: 'day2' },
            { label: 'Phase 0 — シェル操作', slug: 'day2/phase0' },
            { label: 'Phase 1 — TypeScript', slug: 'day2/phase1' },
          ],
        },
        {
          label: 'Day 3 — React',
          items: [
            { label: 'Day 3 概要', slug: 'day3' },
            {
              label: 'Phase 1 — React',
              collapsed: true,
              items: [
                { label: 'はじめに', slug: 'day3/phase1' },
                { label: '1. はじめに', slug: 'day3/phase1/01-hajimeni' },
                { label: '2. 環境構築', slug: 'day3/phase1/02-kankyo-kouchiku' },
                { label: '3. 概論', slug: 'day3/phase1/03-gairon' },
                { label: '4. TSX 1', slug: 'day3/phase1/04-tsx1' },
                { label: '5. 状態', slug: 'day3/phase1/05-joutai' },
                { label: '6. TSX 2', slug: 'day3/phase1/06-tsx2' },
                { label: '7. 副作用', slug: 'day3/phase1/07-fukusayou' },
                { label: '8. CSS', slug: 'day3/phase1/08-css' },
                { label: '9. 演習', slug: 'day3/phase1/09-enshu' },
              ],
            },
          ],
        },
      ],
    }),
  ],
});
