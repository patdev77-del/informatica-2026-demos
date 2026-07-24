<script setup>
import { ref, onMounted } from 'vue'

const theme = ref(null)
function applyTheme(t) {
  if (t) document.documentElement.setAttribute('data-theme', t)
  else document.documentElement.removeAttribute('data-theme')
}
function setAndSave(t) {
  theme.value = t
  if (t) localStorage.setItem('theme', t)
  else localStorage.removeItem('theme')
  applyTheme(t)
}
function toggle() {
  setAndSave(theme.value === 'dark' ? 'light' : 'dark')
}

onMounted(() => {
  const stored = localStorage.getItem('theme')
  if (stored) setAndSave(stored)
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setAndSave('dark')
  else setAndSave('light')
})
</script>

<template>
  <button @click="toggle" aria-label="Toggle theme" class="theme-toggle">
    {{ theme === 'dark' ? '🌙' : '☀️' }}
  </button>
</template>

<style scoped>
.theme-toggle {
  border: 1px solid var(--border);
  background: var(--bg);
  color: var(--text);
  padding: 6px 8px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
}
</style>
