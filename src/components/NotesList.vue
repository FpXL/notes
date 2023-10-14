<template>
  <div class="notes-list">
    <div v-for="note in notes" :key="note.id" class="notes-list__note">
      <NotesListItem :note="note" @select="viewNote" @edit="editNote" @delete="deleteNote" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useNotes } from '@/composables/Notes'

import NotesListItem from './NotesListItem.vue'

const { notes, viewNote, editNote, deleteNote } = useNotes()
</script>

<style>
.notes-list {
  display: grid;
  grid-row-gap: 40px;
}
</style>
