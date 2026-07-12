<script setup>
import { ref } from 'vue'
const text = ref('')
const text2 = ref('')
</script>

<template>
  <h1>v-model</h1>
  <input v-model="text" placeholder="Type something…" />
  <p>You typed: {{ text }}</p>

  <h1>v-bind + event</h1>
  <input v-bind="text2" placeholder="Type something…" @input="(e) => (text2 = e.target.value)" />
  <p>You typed: {{ text2 }}</p>
</template>
