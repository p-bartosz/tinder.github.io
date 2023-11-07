import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import ChatPage from '../pages/TheChat.vue'
import RegisterPage from '../pages/Register.vue'
import LoginPage from '../pages/LoginPage.vue'
import { notAuthorisedOnly } from '@/guards/is-signed-in-out.guard'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'chat',
    component: ChatPage
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/AboutView.vue')
  },
  {
    path: '/login',
    name: 'login',
    beforeEnter: [ notAuthorisedOnly ],
    component: () => LoginPage
  },
  {
    path: '/register',
    name: 'register',
    beforeEnter: [ notAuthorisedOnly ],
    component: () => RegisterPage
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes
});

export default router
