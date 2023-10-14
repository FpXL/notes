<template>
  <div class="notes-list">
    <div v-for="note in notes" :key="note.id" class="notes-list__note">
      <NotesListItem :note="note" @select="viewNote" @edit="editNote" @delete="handleDeleteClick" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotes } from '@/composables/Notes'

import NotesListItem from './NotesListItem.vue'

const { notes, viewNote, editNote, deleteNote } = useNotes()

const handleDeleteClick = (id: number) => {
  deleteNote(id).catch(() => {})
}
</script>

<style>
.notes-list {
  display: grid;
  grid-row-gap: 40px;
}
</style>
