<script setup>
import { ref } from 'vue'
const isLoggedIn = ref(false)
</script>

<template>
  <p v-if="isLoggedIn">Welcome back!</p>
  <p v-else>Please log in.</p>
  <button @click="isLoggedIn = !isLoggedIn">Toggle</button>
</template>
