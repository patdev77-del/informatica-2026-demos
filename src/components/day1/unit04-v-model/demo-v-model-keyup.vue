<script setup>
import { ref } from 'vue'
const text = ref('')
</script>

<template>
  <input v-model="text" @keyup.enter="() => console.log('text=', text)" />
  <p>You typed: {{ text }}</p>
</template>
