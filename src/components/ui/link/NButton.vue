<template>
  <div class="n-button" :class="`n-button--${color}`" @click="$emit('click', $event)">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
type Color = 'blue' | 'red'
import type { PropType } from 'vue'

defineEmits<{
  click: [event: any]
}>()

defineProps({
  color: {
    type: String as PropType<Color>,
    required: true
  }
})
</script>

<style>
.n-button {
  cursor: pointer;
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 4px;
}

.n-button:hover {
  opacity: 0.9;
}

.n-button--blue {
  color: white;
  background-color: #5555dd;
}

.n-button--red {
  color: white;
  background-color: red;
}
</style>
