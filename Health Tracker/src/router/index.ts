import { createRouter, createWebHistory } from 'vue-router'
import StartPage from '../views/StartPage.vue'
import Overview from '../views/Overview.vue'
import Main from '../views/Main.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      alias: ['/start', '/login', '/home'],
      component: StartPage,
    },
    {
      path: '/main',
      name: 'main',
      component: Main,
    },
    {
      path: '/overview',
      name: 'overview',
      component: Overview,
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: '/',
    },
  ],
})

export default router
