import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '@/views/AuthView.vue'
import SignIn from '@/modules/Auth/components/SignIn'

import { TOKEN_STORAGE_KEY } from '@/common/constants'

export const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: '',
      component: AuthView,
      children: [
        {
          name: 'a.sign-in',
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
    },
    {
      name: 'u.supplier',
      path: '/suppliers/:id',
      children: [],
      component: () => import('@/views/SupplierView')
    },
    {
      name: 'u.quotes',
      path: '/quotes',
      children: [],
      component: () => import('@/views/QuotesView')
    }
  ]
})

router.beforeEach((to, from) => {
  if (
    !window.sessionStorage.getItem(TOKEN_STORAGE_KEY) &&
    !['a.sign-in', 'a.create-account'].includes(to.name as string)
  ) {
    return { name: 'a.sign-in' }
  }

  if (['a.sign-in', 'a.create-account'].includes(to.name as string)) {
    window.sessionStorage.removeItem(TOKEN_STORAGE_KEY)
  }
})
