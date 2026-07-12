<script setup>
import { ref } from 'vue'
const isActive = ref(false)
</script>

<template>
  <h1>Text-Content</h1>
  isActive = {{ isActive }} = {{ isActive ? 'active' : 'inactive' }}
  <h1>Attributes</h1>
  <button :class="{ active: isActive }" @click="isActive = !isActive">Toggle</button>
</template>

<style scoped>
.active {
  background-color: rgb(21, 177, 21);
  color: white;
}

.isActive {
  background-color: blue;
}

button {
  color: black;
  width: 50%;
  margin: 10px auto;
}
</style>
