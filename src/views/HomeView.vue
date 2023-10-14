<template>
  <div class="home-view">
    <NLink class="home-view__link" link="/edit">
      <IconNote class="home-view__link-icon" size="60" color="#5555dd" />
      Создать новую заметку
    </NLink>
    <NNotesList class="home-view__notes-list" />
  </div>
</template>

<script setup lang="ts">
import NLink from '@/components/ui/link/NLink.vue'
import NNotesList from '@/components/NotesList.vue'
import IconNote from '@/components/icons/IconNote.vue'
</script>

<style>
.home-view {
  margin: 40px auto 0;
}

.home-view__notes-list {
  max-width: 780px;
  margin: 30px auto 0;
}

.home-view__link {
  font-size: 40px;
  line-height: 60px;
}

.home-view__link-icon {
  margin-right: 15px;
}
</style>
