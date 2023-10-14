<template>
  <div class="note-list-item">
    <div class="note-list-item__name" @click="$emit('select', note.id)">{{ note.name }}</div>
    <ul class="note-list-item__todos">
      <li v-for="todo in displayedTodos" :key="todo.id" class="note-list-item__todo">
        {{ todo.text }}
      </li>
    </ul>
    <div class="note-list-item__buttons">
      <NButton @click="$emit('edit', note.id)" color="blue">Редактировать</NButton>
      <NButton @click="$emit('delete', note.id)" color="red">Удалить</NButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { type Todo, type Note } from '@/types'
import type { PropType } from 'vue'

import NButton from '@/components/ui/link/NButton.vue'

defineEmits<{
  select: [id: number]
  edit: [id: number]
  delete: [id: number]
}>()

const { note } = defineProps({
  note: {
    type: Object as PropType<Note>,
    required: true
  }
})

const displayedTodos = note.todos
  .filter(({ isFinished }) => !isFinished)
  .slice(0, 3)
  .sort((a: Todo, b: Todo) => a.createdAt - b.createdAt)
</script>

<style>
.note-list-item {
  position: relative;
  border: 1px solid #777777;
  border-radius: 5px;
  padding: 20px;
  background-color: #fefefe;
}

.note-list-item:hover {
  background-color: #efefef;
}

.note-list-item__name {
  cursor: pointer;
  text-align: center;
  color: #5555dd;
  font-size: 36px;
  line-height: 40px;
  font-weight: 600;
  padding: 5px;
}

.note-list-item__name:hover {
  opacity: 0.9;
}

.note-list-item__todo {
  padding: 3px;
  font-size: 20px;
  line-height: 24px;
  color: #777777;
}

.note-list-item:hover .note-list-item__buttons {
  position: absolute;
  bottom: 20px;
  right: 20px;
  display: grid;
  grid-template-columns: auto auto;
  grid-gap: 10px;
}

.note-list-item__buttons {
  display: none;
}
</style>
