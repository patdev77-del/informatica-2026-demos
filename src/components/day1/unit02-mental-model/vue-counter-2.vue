<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <h1>Vue Counter</h1>
  <p>Run in <a href="https://vite.new/vue">Stackblitz</a> ...</p>

  <p class="count">
    Count: <span id="display">{{ count }}</span
    >*2 = <span id="doubled">{{ 2 * count }}</span>
  </p>

  <button id="btn" @click="count++">+1</button>
</template>

<style scoped>
button {
  font-size: 1.2rem;
  padding: 0.5rem 1rem;
  cursor: pointer;
  width: 50%;
  margin: 10px auto;
}

.count {
  font-size: 2rem;
  margin: 1rem 0;
}
</style>
