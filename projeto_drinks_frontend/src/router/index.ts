import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

import Home from '@/views/HomeView.vue'
import Detalhes from '@/views/DetalhesView.vue'
import Favoritos from '@/views/FavoritosView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/detalhes/:id',
    name: 'detalhes',
    component: Detalhes,
    props: route => ({
      id: Number(route.params.id)
    })
  },
  {
    path: '/favoritos',
    name: 'favoritos',
    component: Favoritos
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router