<script setup>
import { useTheme } from '@/composables/useTheme'

const { theme } = useTheme()

function toggle() {
  theme.value = theme.value === 'dark' ? 'light' : 'dark'
}
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
