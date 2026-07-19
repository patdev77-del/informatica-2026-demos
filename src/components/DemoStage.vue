<script setup>
import { computed, ref, onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import { units } from '../router.js'
import Prism from 'prismjs'
// Import standard Prism languages
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-javascript'
// Import premium dark theme
import 'prismjs/themes/prism-tomorrow.css'

const route = useRoute()

// Flatten all demos to easily look up the current one by path
const allDemos = computed(() => units.flatMap(u => u.demos))
const activeDemo = computed(() => allDemos.value.find(d => '/' + d.path === route.path))

const codeBlock = ref(null)

const highlight = () => {
  nextTick(() => {
    if (codeBlock.value) {
      Prism.highlightElement(codeBlock.value)
    }
  })
}

// Highlight whenever active demo changes
watch(activeDemo, highlight)
onMounted(highlight)

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
      <a
        :href="stackblitzUrl(activeDemo.file)"
        target="_blank"
        rel="noopener"
        class="sb-btn"
      >
        <span>Open in StackBlitz</span>
        <svg viewBox="0 0 28 28" fill="currentColor" aria-hidden="true">
          <path d="M12.747 16.273h-7.46L18.925 1.5l-3.671 10.227h7.46L9.075 26.5z"/>
        </svg>
      </a>
    </header>

    <!-- Content Split (Fixed side-by-side) -->
    <div class="stage-body">
      <!-- Code Column -->
      <section class="pane code-pane">
        <pre><code ref="codeBlock" class="language-html">{{ activeDemo.source }}</code></pre>
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
  transition: opacity 0.2s, transform 0.1s;
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
  background: #2d2d2d; /* Tomorrow dark theme background */
  border-color: #3d3d3d;
}

.code-pane pre {
  margin: 0;
  padding: 1.2rem;
  overflow: auto;
  height: 100%;
  box-sizing: border-box;
  font-size: 0.8rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-word;
}

.code-pane code {
  background: none;
  padding: 0;
  color: inherit;
  font-size: inherit;
  line-height: inherit;
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
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-8px); }
}

@media (max-width: 1024px) {
  .stage-body {
    grid-template-columns: 1fr;
    height: auto;
    min-height: auto;
    gap: 1rem;
  }
  
  .code-pane, .preview-pane {
    height: 400px;
  }
}
</style>
