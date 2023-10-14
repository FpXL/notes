import { defineStore } from 'pinia'

import { type Todo, type Note } from '@/types'

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: [] as Note[],
    nextId: 0
  }),
  getters: {
    filteredNotes(state) {
      return state.notes.slice().sort((a, b) => a.createdAt - b.createdAt)
    }
  },
  actions: {
    addNote(name: string, todos: Todo[]) {
      this.notes.push({ name, id: this.nextId++, createdAt: Date.now(), todos })
    },

    deleteNote(id: number) {
      this.notes = this.notes.filter((note) => note.id !== id)
    },

    updateNote(id: number, name: string, todos: Todo[]) {
      const _note = this.notes.find((note) => note.id === id)

      if (_note) {
        _note.name = name
        _note.todos = todos
      }
    },

    toggleTodo(noteId: number, todoId: number) {
      const note = this.notes.find((note) => note.id === noteId)
      const todo = note?.todos.find((todo) => todo.id === todoId)

      if (todo) todo.isFinished = !todo.isFinished
    }
  }
})
