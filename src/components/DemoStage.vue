<script setup>
import { computed, ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { day1Units, day2Units } from '../router.js'
import { useTheme } from '@/composables/useTheme'
import { createHighlighterCore } from 'shiki/core'
import { createJavaScriptRegexEngine } from 'shiki/engine/javascript'
import langVue from 'shiki/langs/vue.mjs'
import langHtml from 'shiki/langs/html.mjs'
import langCss from 'shiki/langs/css.mjs'
import langJs from 'shiki/langs/javascript.mjs'
import langTs from 'shiki/langs/typescript.mjs'
import langJson from 'shiki/langs/json.mjs'
import themeGithubDark from 'shiki/themes/github-dark.mjs'
import themeGithubLight from 'shiki/themes/github-light.mjs'

const route = useRoute()
const { theme } = useTheme()

// Flatten all demos to easily look up the current one by path
const allDemos = computed(() => [...day1Units.flatMap((u) => u.demos), ...day2Units.flatMap((u) => u.demos)])
const activeDemo = computed(() => allDemos.value.find((d) => '/' + d.path === route.path))

// Check if source is an array of files or a single string
const sourceIsArray = computed(() => Array.isArray(activeDemo.value?.source))
const sourceFiles = computed(() => {
  if (!activeDemo.value?.source) return []
  if (sourceIsArray.value) return activeDemo.value.source
  return [{ file: activeDemo.value.title, code: activeDemo.value.source }]
})

const selectedFileIndex = ref(0)
const currentSourceFile = computed(() => sourceFiles.value[selectedFileIndex.value])

const highlighter = ref(null)
const highlightedCode = ref('')
const currentThemeName = computed(() => theme.value === 'dark' ? 'github-dark' : 'github-light')

const highlight = () => {
  if (highlighter.value && currentSourceFile.value?.code) {
    const fullHtml = highlighter.value.codeToHtml(currentSourceFile.value.code, {
      lang: 'vue',
      theme: currentThemeName.value
    })
    const match = fullHtml.match(/<pre[^>]*>[\s\S]*<\/pre>/)
    highlightedCode.value = match ? match[0] : ''
  }
}

// Initialize Shiki highlighter once with both themes
onMounted(async () => {
  highlighter.value = await createHighlighterCore({
    themes: [themeGithubDark, themeGithubLight],
    langs: [langVue, langHtml, langCss, langJs, langTs, langJson],
    engine: createJavaScriptRegexEngine()
  })
  highlight()
})

// Re-highlight when theme changes
watch(currentThemeName, highlight)

// Reset file index when demo changes
watch(activeDemo, () => {
  selectedFileIndex.value = 0
  highlight()
})

// Re-highlight when selected file changes
watch(selectedFileIndex, highlight)

const repo = 'patdev77-del/informatica-2026-demos'
function githubUrl(file) {
  return `https://github.com/${repo}/blob/main/${file}`
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
      <a :href="githubUrl(activeDemo.file)" target="_blank" rel="noopener" class="gh-btn">
        <span>View on GitHub</span>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="14" height="14">
          <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
        </svg>
      </a>
    </header>

    <!-- Content Split (Fixed side-by-side) -->
    <div class="stage-body">
      <!-- Code Column -->
      <section class="pane code-pane">
        <!-- File tabs for multi-file demos -->
        <div v-if="sourceIsArray && sourceFiles.length > 1" class="file-tabs">
          <button
            v-for="(file, idx) in sourceFiles"
            :key="idx"
            :class="['tab', { active: selectedFileIndex === idx }]"
            @click="selectedFileIndex = idx"
          >
            {{ file.file }}
          </button>
        </div>
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

.gh-btn {
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

.gh-btn:hover {
  opacity: 0.9;
}

.gh-btn:active {
  transform: scale(0.98);
}

.gh-btn svg {
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
  min-height: 0;
}

.code-pane {
  background: var(--code-bg);
  border-color: var(--border);
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
}

.file-tabs {
  display: flex;
  gap: 0;
  border-bottom: 1px solid var(--border);
  padding: 0.5rem;
  background: var(--code-bg);
  flex-wrap: wrap;
}

.tab {
  padding: 0.5rem 1rem;
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--text);
  font-size: 0.85rem;
  font-family: monospace;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
  white-space: nowrap;
}

.tab:hover {
  background: rgba(170, 59, 255, 0.08);
}

.tab.active {
  color: var(--accent);
  border-bottom-color: var(--accent);
}

.code-pane .shiki-code {
  height: 100%;
  width: 100%;
  overflow: auto;
  white-space: pre;
  flex: 1;
}

.code-pane .shiki-code pre {
  margin: 0 !important;
  padding: 1.2rem !important;
  overflow: auto;
  height: 100%;
  width: 100%;
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
