<script setup>
import { ref } from 'vue'
const fruits = ref(['Apple', 'Banana', 'Cherry'])
</script>

<template>
  <ul>
    <li v-for="fruit in fruits" :key="fruit">{{ fruit }}</li>
  </ul>
</template>
