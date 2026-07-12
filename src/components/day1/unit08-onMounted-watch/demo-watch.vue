<script setup>
import { ref, onMounted, watch } from 'vue'

const name = ref('')
const place = ref('')

onMounted(() => {
  console.log('component mounted!')
  const saved = localStorage.getItem('demo-name')
  if (saved) name.value = saved
})

watch(name, (val) => {
  console.log('name changed to:', val)
  localStorage.setItem('demo-name', val)
})
</script>

<template>
  <input v-model="name" placeholder="Type your name…" />
  <input v-model="place" placeholder="Type a place…" />
</template>
