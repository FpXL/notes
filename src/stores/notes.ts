import { defineStore } from 'pinia'

import { type Todo, type Note } from '@/types'

const defaultNotes = [
  {
    name: 'Вечером',
    id: 1,
    createdAt: 2,
    todos: [
      {
        text: 'пресс качат',
        createdAt: 1,
        id: 1,
        isFinished: false
      },
      {
        text: 'бегит',
        createdAt: 2,
        id: 2,
        isFinished: false
      },
      {
        text: 'турник',
        id: 3,
        createdAt: 3,
        isFinished: false
      },
      {
        text: 'анжуманя',
        id: 4,
        createdAt: 4,
        isFinished: false
      },
      {
        text: 'гантели',
        id: 5,
        createdAt: 5,
        isFinished: false
      }
    ]
  },
  {
    name: 'Утром',
    id: 0,
    createdAt: 1,
    todos: [
      {
        text: '1. пресс качат',
        id: 1,
        createdAt: 1,
        isFinished: false
      },
      {
        text: '2. бегит',
        id: 2,
        createdAt: 2,
        isFinished: false
      },
      {
        text: '3. турник',
        id: 3,
        createdAt: 3,
        isFinished: true
      },
      {
        text: '4. анжуманя',
        id: 4,
        createdAt: 4,
        isFinished: false
      }
    ]
  }
]

export const useNotesStore = defineStore('notes', {
  state: () => ({
    notes: defaultNotes as Note[],
    nextId: 2
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
