import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    { path: '/', redirect: '/HomeView' },

    {
      path: '/user/:userId',
      name: 'User',
      component: () => import('../views/UserView.vue'),
      props: true,
    },
  ],
})

export default router
