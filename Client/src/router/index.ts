import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    { path: '/', redirect: '/HomeView' }, // Add this line to redirect from / to /HomeView
  ],
})

export default router

// It's making custom routes like /login when I hit the login button, when I need it to be /loginView. I need to figure out how to make /login work for the login button and
