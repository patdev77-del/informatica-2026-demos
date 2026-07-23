<script setup lang="ts">
defineProps<{
  name: string;
  tagline?: string;
}>();
</script>

<template>
  <h3>{{ name }}</h3>
  <p v-if="tagline">{{ tagline }}</p>
  <p v-else>No tagline yet.</p>
</template>