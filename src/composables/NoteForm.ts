import { watch, reactive, computed } from 'vue'

import type { Note, Todo } from '@/types'

export function useNoteForm(note?: Note) {
  const noteForm: { name: string; todos: Todo[] } = reactive({
    name: note?.name || '',
    todos: note?.todos.slice() || []
  })

  const makeTodo = (text: string, id: number): Todo => ({
    text,
    id,
    createdAt: Date.now(),
    isFinished: false
  })

  ;[0, 1, 2].slice(-1 * noteForm.todos.length).forEach((i) => noteForm.todos.push(makeTodo('', i)))

  watch(
    noteForm,
    ({ todos }) => {
      if (todos.every(({ text }) => text)) noteForm.todos.push(makeTodo('', todos.length))
    },
    { immediate: true }
  )

  const isValid = computed(() => !!noteForm.name)

  return { noteForm, isValid }
}
