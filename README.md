# Riya Mahato — One-Page Engineering Portfolio

Personal portfolio website for **Riya Mahato**, Technical Sales Engineer & Applied AI Systems Builder. Built with React, TypeScript, Tailwind CSS v4, and Motion (`motion/react`).

## Structure & Editable Data Modules

- `src/pages/OnePagePortfolio.tsx` & `src/components/OnePageLayout.tsx` — Continuous scrolling 7-section one-page portfolio with sticky `WORK / EXPERIENCE / EXPERTISE / ABOUT / CONTACT` navigation and active-section tracking.
- `src/components/ProjectDrawer.tsx` — Slide-over technical drawer for inspecting system architecture diagrams, planned test harnesses, engineering trade-offs, and NDA scope notes.
- `src/data/portfolio.ts` — Core project specifications, NDA toggle (`showConfidentialOemProject`), experience records, and confirmation flags.
- `src/data/results.ts` — Separate, easily editable store for verified project outcomes and benchmarks once formally measured.
- `src/data/toolkit.ts` — Five-category engineering toolkit and active learning boundary notes.
- `src/data/photography.ts` — Dedicated photography manifest mapping real assets in `public/assets/aistudio/` with `aspectRatioClass`, `objectPosition`, category, caption, and `publicationApproved`.

## Local Development

```bash
npm install
npm run dev
```

## Type Checking & Production Build

```bash
npm run lint
npm run build
```
