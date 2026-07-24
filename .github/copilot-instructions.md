# Copilot instructions — Informatica Vue 2026 demos

Purpose: quick, actionable context for Copilot/assistant sessions in this repo.

1) Build / test / lint commands
- Dev server: npm run dev
- Build (type-check + bundle): npm run build
- Preview production bundle: npm run preview
- Type-check only: npm run type-check (uses vue-tsc)
- Format: npm run format (prettier on src/)
- Tests: none configured in this repo. To add tests, prefer Vitest; single-test run example (after adding vitest): npx vitest run path/to/test.spec.js

2) High-level architecture
- Entry: src/main.js mounts App and uses the router.
- Routing & demo registry: src/router.js exports day1Units and day2Units arrays. Each demo entry: { path, title, file, component, source }.
  - Router imports both the .vue component and the raw source via `?raw` (e.g. `import X from './foo.vue?raw'`). The app flattens units into routes using createWebHashHistory.
- Demo stage: src/components/DemoStage.vue renders highlighted source (Shiki) on the left and the live demo component on the right. Shiki is initialized with a small set of langs/themes — add languages here if new demo languages are needed.
- Components layout: demos live under src/components/day{1,2}/unitNN-name/, one demo per .vue file plus any supporting components.
- Styling: global tokens and themes live in src/style.css.
- TypeScript config: tsconfig.app.json sets "baseUrl": "." and a path alias `@/*` -> `./src/*`.

3) Key conventions and patterns
- Every demo must be imported twice in src/router.js: the component and the `?raw` source string. Add both imports and a single entry in the appropriate dayUnits array.
- Keep file naming and directory shape: src/components/day{1,2}/unitNN-... — router.js assumes those paths when building `file` values for the GitHub link in DemoStage.
- Routing uses hash history intentionally (createWebHashHistory) — tests or tooling should navigate via hash paths.
- Shiki usage: DemoStage imports only needed languages. If demos include new syntaxes (e.g., Python, SQL), add the language to DemoStage's imports and the highlighter setup.
- Type-checks: use `npm run type-check` before publishing builds; build runs vue-tsc first.
- No test runner/linter configured: no test commands or eslint scripts present. Add tooling if CI requires it.
- Git commit trailer: repo tooling expects normal commits; if automated commits are added by Copilot workflows, include project or org required trailers in the CI step (not enforced here).

4) Existing AI assistant files to reference
- AGENTS.md contains workshop context and the "how to add a demo" steps — keep it in sync with router.js imports.

---

Created: .github/copilot-instructions.md

[summary] Created concise Copilot guidance: build/type-check/format commands, architecture notes, and repo-specific conventions.
