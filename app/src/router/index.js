import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'top',
    redirect: { name: 'everybodys-posts', params: { pageNumber: 1 } },
  },
  {
    path: '/everybodys-posts/:pageNumber',
    name: 'everybodys-posts',
    component: () => import('@/views/EverybodysPosts.vue'),
    beforeEnter: (to, from) => {
      console.log(store.state.articles.searchValue)
      if (!store.state.articles.searchValue) {
        const postData = {
          age: '',
          annual_income: '',
          family_members: '',
          page_number: '1',
        }
        store.commit('SET_SEARCH_VALUES', postData)
      }
    },
  },
  {
    path: '/past-posts/:pageNumber',
    name: 'past-posts',
    component: () => import('@/views/PastPosts.vue'),
  },
  {
    path: '/user-redirect/:token/:id',
    name: 'user-redirect',
    component: () => import('@/views/UserRedirect.vue'),
  },
  {
    path: '/user-home/:id',
    name: 'user-home',
    component: () => import('@/views/UserHome.vue'),
    meta: { requireAuth: true },
  },
  {
    path: '/post-article/:id',
    name: 'post-article',
    component: () => import('@/views/PostArticle.vue'),
    meta: { requireAuth: true },
  },
  {
    path: '/create-profile/:id',
    name: 'create-profile',
    component: () => import('@/views/CreateProfile.vue'),
    meta: { requireAuth: true },
  },
  {
    path: '/edit-article/:id',
    name: 'edit-article',
    component: () => import('@/views/EditArticle.vue'),
    meta: { requireAuth: true },
    beforeEnter: (to, from) => {
      store.dispatch('editArticle', to.params.id)
      console.log(to.params.id)
    },
  },
  {
    path: '/edit-profile/:id',
    name: 'edit-profile',
    component: () => import('@/views/EditProfile.vue'),
    meta: { requireAuth: true },
    beforeEnter: (to, from) => {
      store.dispatch('showProfile')
    },
  },
  {
    path: '/:catchAll(.*)*',
    redirect: { name: 'top' },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkExactActiveClass: 'active-link',
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            left: savedPosition.left,
            top: savedPosition.top,
            behavior: 'smooth',
          })
        }, 700)
      })
    } else {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve({
            top: 0,
            behavior: 'smooth',
          })
        }, 500)
      })
    }
  },
})

router.beforeEach((to, from, next) => {
  store.commit('SET_ERROR_MESSAGE', null)
  if (to.meta.requireAuth) {
    if (!localStorage.getItem('token')) {
      store.commit('SIGN_IN_MODAL_TOGGLE')
      next({ name: 'top' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
