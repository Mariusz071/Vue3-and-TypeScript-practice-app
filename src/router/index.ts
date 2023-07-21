import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/AuthView.vue'
import SignIn from '@/modules/Auth/components/SignIn'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: AuthView,
      children: [
        {
          name: 'a.sing-in',
          path: '/',
          redirect: '',
          children: [],
          component: SignIn
        },
        {
          name: 'a.create-account',
          path: '/create-account',
          redirect: '',
          children: [],
          component: () => import('@/modules/Auth/components/CreateAccount')
        }
      ]
    },
    {
      name: 'u.suppliers',
      path: '/suppliers',
      children: [],
      component: () => import('@/views/SuppliersView')
    }
  ]
})
