import { useNotesStore } from '@/stores/notes'

import router from '@/router'
import { computed } from 'vue'

export function useNotes() {
  const store = useNotesStore()

  const notes = computed(() => store.filteredNotes)

  const viewNote = (id: number) => {
    router.push({ name: 'note', query: { id } })
  }

  const editNote = (id: number) => {
    router.push({ name: 'edit', query: { id } })
  }

  const deleteNote = async (id: number) => {
    const note = store.notes.find((note) => note.id === id)

    if (note && confirm(`Удалить заметку "${note.name}"?`)) store.deleteNote(id)

    return Promise.resolve()
  }

  return {
    notes,
    viewNote,
    editNote,
    deleteNote
  }
}
