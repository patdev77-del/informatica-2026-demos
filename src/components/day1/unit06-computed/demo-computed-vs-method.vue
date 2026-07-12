<script setup>
import { ref, computed } from 'vue'
const price = ref(10)
const quantity = ref(2)

const total = computed(() => price.value * quantity.value)
function totalFn() {
  return price.value * quantity.value
}
</script>

<template>
  <input v-model.number="price" type="number" />
  ×
  <input v-model.number="quantity" type="number" />
  = {{ total }} ({{ totalFn() }})
</template>
