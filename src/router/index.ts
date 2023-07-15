import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/sign-in',
    name: 'signIn',
    component: () => import('../views/SignInView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
