import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/Login/index.vue'),
      children: [
        {
          path: '/login/sign',
          name: 'sign',
          component: () => import('../views/Login/SignIn/index.vue'),
        },
      ],
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/Home/index.vue'),
    },
    {
      path: '/coge',
      name: 'coge',
      component: () => import('../views/Coge/index.vue'),
      children: [
        {
          path: 'Html-button',
          name: 'Html-button',
          component: () => import('../views/Coge/Coge-content-Html/index.vue'),
        },
      ],
    },
  ],
})

export default router
