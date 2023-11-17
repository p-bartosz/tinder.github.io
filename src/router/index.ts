import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import ChatPage from '../pages/TheChat.vue'
import RegisterPage from '../pages/Register.vue'
import LoginPage from '../pages/LoginPage.vue'
import { notAuthorisedOnly } from '@/guards/is-signed-in-out.guard'
import { ROUTS } from './routs'

const routes: Array<RouteRecordRaw> = [
  {
    path: ROUTS.MAIN,
    name: 'chat',
    component: ChatPage
  },
  {
    path: ROUTS.MAP,
    name: 'map',
    // route level code-splitting
    // this generates a separate chunk (map.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "map" */ '../pages/MapView.vue')
  },
  {
    path: ROUTS.LOGIN,
    name: 'login',
    beforeEnter: [ notAuthorisedOnly ],
    component: () => LoginPage
  },
  {
    path: ROUTS.REGISTER,
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
