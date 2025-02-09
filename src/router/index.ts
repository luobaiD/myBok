import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
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
      component: () => import('../views/Home/index.vue'),
      children: [
        {
          path: '',
          name: 'home-body',
          component: () => import('../views/Home/body/index.vue'),
        },{
          path: '/home-content/:id',
          name: 'home-content',
          component: () => import('../views/Home/body/content.vue'),
        }
      ]
    },
    {
      path: '/coge',
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
