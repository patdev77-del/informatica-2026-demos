<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { day1Units } from '../router.js'
import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import langVue from 'shiki/langs/vue.mjs'
import langHtml from 'shiki/langs/html.mjs'
import langCss from 'shiki/langs/css.mjs'
import langJs from 'shiki/langs/javascript.mjs'
import langTs from 'shiki/langs/typescript.mjs'
import langJson from 'shiki/langs/json.mjs'
import themeGithubDark from 'shiki/themes/github-dark.mjs'

const route = useRoute()

// Flatten all demos to easily look up the current one by path
const allDemos = computed(() => day1Units.flatMap((u) => u.demos))
const activeDemo = computed(() => allDemos.value.find((d) => '/' + d.path === route.path))

const highlighter = ref(null)
const highlightedCode = ref('')

const highlight = () => {
  if (highlighter.value && activeDemo.value?.source) {
    const fullHtml = highlighter.value.codeToHtml(activeDemo.value.source, {
      lang: 'vue',
      theme: 'github-dark'
    })
    // Extract just the <pre> block from the full HTML page
    const match = fullHtml.match(/<pre[^>]*>[\s\S]*<\/pre>/)
    highlightedCode.value = match ? match[0] : ''
  }
}

// Initialize Shiki highlighter with only needed languages
onMounted(async () => {
  highlighter.value = await createHighlighterCore({
    themes: [themeGithubDark],
    langs: [langVue, langHtml, langCss, langJs, langTs, langJson],
    engine: createJavaScriptRegexEngine()
  })
  highlight()
})

// Highlight whenever active demo changes
watch(activeDemo, highlight)

const repo = 'patdev77-del/informatica-2026-demos'
function stackblitzUrl(file) {
  return `https://stackblitz.com/github/${repo}/tree/main?file=${file}`
}
</script>

<template>
  <div v-if="activeDemo" class="demo-stage">
    <!-- Header -->
    <header class="stage-header">
      <div class="stage-title">
        <span class="file-icon">📄</span>
        <code>{{ activeDemo.title }}</code>
      </div>
      <a :href="stackblitzUrl(activeDemo.file)" target="_blank" rel="noopener" class="sb-btn">
        <span>Open in StackBlitz</span>
        <svg viewBox="0 0 28 28" fill="currentColor" aria-hidden="true">
          <path d="M12.747 16.273h-7.46L18.925 1.5l-3.671 10.227h7.46L9.075 26.5z" />
        </svg>
      </a>
    </header>

    <!-- Content Split (Fixed side-by-side) -->
    <div class="stage-body">
      <!-- Code Column -->
      <section class="pane code-pane">
        <pre v-html="highlightedCode" class="shiki-code" />
      </section>


      <!-- Preview Column -->
      <section class="pane preview-pane">
        <div class="preview-card">
          <component :is="activeDemo.component" />
        </div>
      </section>
    </div>
  </div>
  <div v-else class="stage-empty">
    <div class="empty-hero">
      <span class="empty-icon">⚡</span>
      <h2>Vue 3 Demos</h2>
      <p>Select a demo from the sidebar to view source code and run live examples side-by-side.</p>
    </div>
  </div>
</template>

<style scoped>
/* Demo Stage Split Layout */
.demo-stage {
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 1.5rem;
  box-sizing: border-box;
}

.stage-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--border);
  padding-bottom: 1rem;
}

.stage-title {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stage-title code {
  font-size: 0.9rem;
  background: var(--code-bg);
  padding: 0.3rem 0.6rem;
  border-radius: 6px;
  color: var(--text-h);
}

.file-icon {
  font-size: 1.2rem;
}

.sb-btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  background: var(--accent);
  color: #fff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.85rem;
  transition:
    opacity 0.2s,
    transform 0.1s;
}

.sb-btn:hover {
  opacity: 0.9;
}

.sb-btn:active {
  transform: scale(0.98);
}

.sb-btn svg {
  width: 14px;
  height: 14px;
}

.stage-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  height: calc(100svh - 180px);
  min-height: 450px;
}

.pane {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: 12px;
  background: var(--bg);
  min-width: 0;
}

.code-pane {
  background: #1e1e1e; /* github-dark theme background */
  border-color: #3d3d3d;
  padding: 0;
}

.code-pane .shiki-code {
  height: 100%;
  overflow: auto;
  white-space: pre;
}

.code-pane .shiki-code pre {
  margin: 0 !important;
  padding: 1.2rem !important;
  overflow: auto;
  height: 100%;
  box-sizing: border-box;
  font-size: 0.8rem !important;
  line-height: 1.5 !important;
  background: transparent !important;
  white-space: pre !important;
  word-spacing: normal;
  word-break: normal;
}

.preview-pane {
  overflow: auto;
  background: var(--social-bg);
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
}

.preview-card {
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: var(--shadow);
  box-sizing: border-box;
  flex-grow: 1;
  overflow-y: auto;
}

/* Empty State */
.stage-empty {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 400px;
  text-align: center;
  padding: 2rem;
}

.empty-hero {
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.8rem;
}

.empty-icon {
  font-size: 3rem;
  animation: float 3s ease-in-out infinite;
}

.empty-hero h2 {
  margin: 0;
}

.empty-hero p {
  color: var(--text);
  font-size: 0.95rem;
  line-height: 1.5;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-8px);
  }
}

@media (max-width: 1024px) {
  .stage-body {
    grid-template-columns: 1fr;
    height: auto;
    min-height: auto;
    gap: 1rem;
  }

  .code-pane,
  .preview-pane {
    height: 400px;
  }
}
</style>
