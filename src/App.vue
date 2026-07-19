<script setup>
import { RouterLink } from 'vue-router'
import { units } from './router.js'
import DemoStage from './components/DemoStage.vue'
</script>

<template>
  <div id="app-root">
    <!-- ── Sidebar ── -->
    <nav id="main-nav">
      <div class="nav-brand">
        <span class="nav-brand-icon">⚡</span>
        <div>
          <div class="nav-brand-title">Vue 3</div>
          <div class="nav-brand-sub">Day 1 Demos</div>
        </div>
      </div>

      <div v-for="unit in units" :key="unit.title" class="nav-unit">
        <span class="nav-unit-label">{{ unit.title }}</span>
        <ul>
          <li v-for="demo in unit.demos" :key="demo.path" class="nav-item">
            <RouterLink :to="'/' + demo.path">
              <span class="link-dot"></span>{{ demo.title }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </nav>

    <!-- ── Demo stage ── -->
    <main id="demo-view">
      <DemoStage />
    </main>
  </div>
</template>

<style scoped>
/* ── Layout ── */
#app-root {
  display: flex;
  min-height: 100svh;
}

/* ── Sidebar ── */
#main-nav {
  width: 260px;
  flex-shrink: 0;
  border-right: 1px solid var(--border);
  padding: 1.25rem 1rem 2rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

/* Brand block */
.nav-brand {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.6rem 0.75rem;
  background: var(--accent-bg);
  border: 1px solid var(--accent-border);
  border-radius: 10px;
}

.nav-brand-icon {
  font-size: 1.4rem;
  line-height: 1;
}

.nav-brand-title {
  font-size: 0.95rem;
  font-weight: 700;
  color: var(--text-h);
  line-height: 1.2;
}

.nav-brand-sub {
  font-size: 0.7rem;
  color: var(--accent);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Unit groups */
.nav-unit {
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  min-width: none;
}

.nav-unit-label {
  font-size: 0.68rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text);
  padding: 0 0.5rem;
}

.nav-unit ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.nav-item {
  display: flex;
  align-items: center;
}

.nav-unit a {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.38rem 0.6rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-family: var(--mono);
  color: var(--text);
  text-decoration: none;
  transition:
    background 0.13s,
    color 0.13s;
}

.nav-unit a:hover {
  background: var(--social-bg);
  color: var(--text-h);
}

.nav-unit a.router-link-active {
  background: var(--accent-bg);
  color: var(--accent);
}

/* little leading dot on each link */
.link-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  flex-shrink: 0;
  background: currentColor;
  opacity: 0.45;
  transition: opacity 0.13s;
}

.nav-unit a.router-link-active .link-dot {
  opacity: 1;
}

/* ── Demo stage ── */
#demo-view {
  padding: 3rem 2.5rem;
}
</style>
