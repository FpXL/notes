<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    view-box="0 0 24 24"
    :width="size"
    :height="size"
    :fill="color"
  >
    <path
      d="M5 2h16v20H3V2h2zm14 18V4H5v16h14zM7 6h10v2H7V6zm10 4H7v2h10v-2zM7 14h7v2H7v-2z"
      :style="`transform: scale(${Number(size) / 24})`"
    />
  </svg>
</template>

<script setup lang="ts">
defineProps({
  size: {
    type: [String, Number],
    default: 20
  },
  color: {
    type: String,
    default: '#111111'
  }
})
</script>
