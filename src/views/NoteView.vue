<template>
  <div class="note-view">
    <NLink class="note-view__link" link="/">
      <IconHome class="note-view__link-icon" size="60" color="#5555dd" />
      К списку заметок
    </NLink>
    <div v-if="note" class="note-view__content">
      <div class="note-view__note-name">
        {{ note.name }}
      </div>
      <div class="note-view__todos">
        <label v-for="todo in todos" :key="todo.createdAt" class="note-view__todo">
          <input @change="handleTodoClick(todo.id)" :checked="todo.isFinished" type="checkbox" />
          <span
            class="note-view__todo-text"
            :class="{
              'note-view__todo-text--finished': todo.isFinished
            }"
          >
            {{ todo.text }}
          </span>
        </label>
      </div>
      <div class="note-view__buttons">
        <NButton @click="editNote(note.id)" color="blue">Редактировать</NButton>
        <NButton @click="handleDeleteClick" color="red">Удалить</NButton>
      </div>
    </div>
    <div v-else>Не найдено :(</div>
  </div>
</template>

<script setup lang="ts">
import NButton from '@/components/ui/link/NButton.vue'
import NLink from '@/components/ui/link/NLink.vue'
import IconHome from '@/components/icons/IconHome.vue'

import { useNotes } from '@/composables/Notes'

import router from '@/router'

import { useNotesStore } from '@/stores/notes'

const queryId = router.currentRoute.value.query.id?.toString()

const { toggleTodo } = useNotesStore()
const { notes, editNote, deleteNote } = useNotes()

const note = notes.value.find((note) => note.id.toString() === queryId)
const todos = note?.todos
  .slice()
  .sort((a, b) => a.createdAt - b.createdAt)
  .sort((a, b) => {
    const [p1, p2] = [a.isFinished ? 1 : 0, b.isFinished ? 1 : 0]

    return p1 - p2
  })

const handleTodoClick = (id: number) => {
  if (note) toggleTodo(note.id, id)
}
const handleDeleteClick = async () => {
  if (note) await deleteNote(note.id)

  router.push({ name: 'home' })
}
</script>

<style>
.note-view {
  max-width: 780px;
  margin: 40px auto 0;
}

.note-view__link {
  font-size: 40px;
  line-height: 60px;
}

.note-view__link-icon {
  margin-right: 15px;
}

.note-view__content {
  max-width: 780px;
  margin: 40px auto 0;
  border: 1px solid #777777;
  padding: 30px;
  border-radius: 15px;
}

.note-view__note-name {
  font-size: 40px;
  line-height: 60px;
  text-align: center;
}

.note-view__todos {
  margin-bottom: -10px;
}

.note-view__todo {
  display: block;
  cursor: pointer;
  font-size: 24px;
  line-height: 30px;
  margin-bottom: 10px;
}

.note-view__todo input {
  margin-right: 10px;
}

.note-view__todo:hover {
  opacity: 0.9;
}

.note-view__todo-text {
  font-size: 24px;
  line-height: 30px;
  user-select: none;
}

.note-view__todo-text--finished {
  text-decoration: line-through;
  color: #777777;
}

.note-view__buttons {
  margin-top: 50px;
  display: grid;
  grid-gap: 10px;
  width: 140px;
}
</style>
