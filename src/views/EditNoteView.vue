<template>
  <div class="new-note-view">
    <NLink class="new-note-view__link" link="/">
      <IconHome class="new-note-view__link-icon" size="60" color="#5555dd" />
      К списку заметок
    </NLink>
    <form class="new-note-view__form" @submit.prevent="submitNote">
      <label class="new-note-view__note-name">
        Название*:
        <input type="text" v-model="noteForm.name" />
      </label>
      <div class="new-note-view__todos">
        Задачи:
        <input
          v-for="todo in noteForm.todos"
          :key="todo.id"
          type="text"
          class="new-note-view__todo"
          v-model="todo.text"
          @change="todo.isFinished = false"
        />
      </div>
      <button class="new-note-view__submit" type="submit">Сохранить</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import NLink from '@/components/ui/link/NLink.vue'
import IconHome from '@/components/icons/IconHome.vue'
import { reactive, watch, computed } from 'vue'
import type { Todo } from '@/types'
import { useNotesStore } from '@/stores/notes'
import router from '@/router'

const queryId = router.currentRoute.value.query.id?.toString()

const { addNote, filteredNotes, updateNote } = useNotesStore()

const note = filteredNotes.find((note) => note.id.toString() === queryId)

const makeTodo = (text: string, id: number): Todo => ({
  text,
  id,
  createdAt: Date.now(),
  isFinished: false
})

const noteForm: { name: string; todos: Todo[] } = reactive({
  name: '',
  todos: []
})

if (note) {
  noteForm.name = note.name
  noteForm.todos = note.todos.slice()
} else {
  ;[0, 1, 2].forEach((i) => noteForm.todos.push(makeTodo('', i)))
}

watch(
  noteForm,
  ({ todos }) => {
    if (todos.filter(({ text }) => text).length === todos.length)
      noteForm.todos.push(makeTodo('', todos.length))
  },
  { immediate: true }
)

const isValid = computed(() => !!noteForm.name)

const submitNote = () => {
  if (!isValid.value) {
    alert('Не заполнены обязательные поля')

    return
  }

  const filteredTodos = noteForm.todos.filter(({ text }) => text)

  if (note) {
    updateNote(note.id, noteForm.name, filteredTodos)

    router.back()
  } else {
    addNote(noteForm.name, filteredTodos)

    router.push({ name: 'home' })
  }
}
</script>

<style>
.new-note-view {
  max-width: 780px;
  margin: 40px auto 0;
}

.new-note-view__link {
  font-size: 40px;
  line-height: 60px;
}

.new-note-view__link-icon {
  margin-right: 15px;
}

.new-note-view__form {
  padding: 30px 0 0;
}

.new-note-view__form input {
  padding: 5px 15px;
}

.new-note-view__note-name,
.new-note-view__note-name input {
  font-size: 24px;
  line-height: 30px;
}

.new-note-view__note-name input {
  margin-left: 15px;
}

.new-note-view__todos {
  padding: 25px 15px 0;
  display: flex;
  flex-direction: column;
  font-size: 18px;
  line-height: 24px;
}

.new-note-view__todo {
  margin-top: 10px;
  margin-left: 15px;
  font-size: 18px;
  line-height: 24px;
}

.new-note-view__submit {
  cursor: pointer;
  float: right;
  margin: 15px 15px 0 0;
  color: white;
  background-color: green;
  border: none;
  border-radius: 4px;
  line-height: 50px;
  padding: 0 10px;
}
</style>
