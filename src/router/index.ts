import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import NoteView from '@/views/NoteView.vue'
import EditNoteView from '@/views/EditNoteView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/note',
      name: 'note',
      component: NoteView
    },
    {
      path: '/edit',
      name: 'edit',
      component: EditNoteView
    }
  ]
})

export default router
