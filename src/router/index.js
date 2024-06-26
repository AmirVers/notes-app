import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/Home.vue'
import Register from '@/views/Register.vue'
import Login from '@/views/Login.vue'
import ForgotPassword from '@/views/forgotPassword.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/forgotPassword',
      name: 'forgotPassword',
      component: ForgotPassword
    }
  ]
})

export default router
