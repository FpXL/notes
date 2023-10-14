<template>
  <div class="n-link" @click="handleClick">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import router from '@/router'

const props = defineProps({
  link: {
    type: String,
    required: true
  }
})

const handleClick = () => router.push(props.link)
</script>

<style>
.n-link {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  text-decoration: none;
  color: #5555dd;
}

.n-link:hover {
  opacity: 0.9;
}
</style>
