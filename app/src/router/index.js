import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

const routes = [
  {
    path: '/',
    name: 'top',
    redirect: { name: 'everybodys-posts' },
  },
  {
    path: '/everybodys-posts',
    name: 'everybodys-posts',
    component: () => import('@/views/EverybodysPosts.vue'),
  },
  {
    path: '/user-redirect/:token/:id',
    name: 'user-redirect',
    component: () => import('@/views/UserRedirect.vue'),
  },
  {
    path: '/edit-article-redirect/:id',
    name: 'edit-article-redirect',
    component: () => import('@/views/EditArticleRedirect.vue'),
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
  },
  {
    path: '/edit-profile/:id',
    name: 'edit-profile',
    component: () => import('@/views/EditProfile.vue'),
    meta: { requireAuth: true },
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
