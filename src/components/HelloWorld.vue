<script setup>
import { ref } from 'vue';
const count = 0;

function incr() {
  count++;
  console.log('incr => ', count);
}
</script>

<template>
  <p class="count">
    Count: <span id="display">{{ count }}</span
    >*2 = <span id="doubled">{{ 2 * count }}</span>
  </p>

  <button id="btn" @click="incr()">+1</button>
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
