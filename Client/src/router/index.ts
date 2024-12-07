import { createRouter, createWebHistory } from 'vue-router'
import { routes as autoRoutes } from 'vue-router/auto-routes'

const routes = [
  ...autoRoutes,
  {
    path: '/',
    name: 'HomeRedirect',
    redirect: '/HomeView',
  },
  {
    path: '/user/:userId',
    name: 'User',
    component: () => import('../views/UserView.vue'),
    props: true,
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUpView.vue'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginView.vue'),
  },
  {
    path: '/HomeView',
    name: 'HomeView',
    component: () => import('../views/HomeView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

export default router
