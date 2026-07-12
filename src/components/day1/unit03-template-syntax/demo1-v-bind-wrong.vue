<script setup>
import { ref } from 'vue'
const isActive = ref(false)
</script>

<template>
  <h1>Text-Content</h1>
  isActive = {{ isActive }} = {{ isActive ? 'active' : 'inactive' }}
  <h1>Attributes</h1>
  <p>The wrong way:</p>
  <button class="{{ isActive }}" @click="isActive = !isActive">Toggle</button>
</template>

<style scoped>
.isActive {
  background-color: blue;
}

button {
  color: azure;
  width: 50%;
  margin: 10px auto;
}
</style>
