# informatica-2026-demos — Agent Context

Demos for the **Vue 3 Workshop** at Informatica Feminale 2026.

## Tech Stack

| Tool | Version |
|------|---------|
| Vue | 3.5.x |
| Vue Router | 5.0.x |
| Vite | 8.x |
| TypeScript | 6.x |

## Architecture

- **`src/main.js`** – App entry point
- **`src/router.js`** – Central registry of all demos (hash-history routing); exports `units` array containing component references and raw source codes
- **`src/App.vue`** – Shell with sidebar nav + `<DemoStage>` wrapper layout
- **`src/components/DemoStage.vue`** – Wrapper stage rendering raw source code on the left (using PrismJS) and the active component on the right
- **`src/style.css`** – Global CSS design tokens (light/dark theme, purple accent `#aa3bff`)

## Adding a New Demo

1. Create the `.vue` file under `src/components/day1/<unitXX-name>/`.
2. Import the component AND its raw source string in `src/router.js`:
   ```javascript
   import MyDemo from './components/day1/unitXX-name/my-demo.vue'
   import MyDemoSource from './components/day1/unitXX-name/my-demo.vue?raw'
   ```
3. Add an entry to the `units` array with `{ path, title, file, component, source: MyDemoSource }`.

## Demo Components (Day 1)

```
src/components/day1/
  unit02-mental-model/       vue-counter-2.vue
  unit03-template-syntax/    demo1-v-bind-wrong.vue, demo1-v-bind.vue,
                             demo2-v-if.vue, demo2-v-show.vue,
                             demo3-v-for-without-key.vue, demo3-v-for.vue
  unit04-v-model/            demo-v-model.vue, demo-v-model-explained.vue,
                             demo-v-model-keyup.vue
  unit06-computed/           demo-computed-vs-method.vue
  unit08-onMounted-watch/    demo-watch.vue, demo-watchEffect.vue
```

## Demo Components (Day 2)

```
src/components/day2/
  unit11-demo-props/         demo-props-parent.vue, SpeakerCard.vue
```

## Dev Server

```bash
npm run dev
```
