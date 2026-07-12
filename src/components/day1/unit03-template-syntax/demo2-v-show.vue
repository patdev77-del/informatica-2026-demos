<script setup>
import { ref } from 'vue'
const isLoggedIn = ref(false)
</script>

<template>
  <p v-show="isLoggedIn">Welcome back!</p>
  <button @click="isLoggedIn = !isLoggedIn">Toggle</button>
</template>
