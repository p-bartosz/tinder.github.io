import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Chat from '../pages/TheChat.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'chat',
    component: Chat
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
