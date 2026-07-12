<script setup>
import { ref, onMounted, watchEffect } from 'vue'

const name = ref('')
const place = ref('')

onMounted(() => {
  console.log('--- component mounted!')
})

watchEffect(() => {
  console.log('--- watchEffect')
  console.log('name:', name.value)
  console.log('place:', place.value)
})
</script>

<template>
  <input v-model="name" placeholder="Type your name…" />
  <input v-model="place" placeholder="Type a place…" />
</template>
