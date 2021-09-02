import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'top',
    redirect: { name: 'everybodys-posts' },
  },
  {
    path: '/everybodys-posts',
    name: 'everybodys-posts',
    component: () => import('../views/EverybodysPosts.vue'),
  },
  {
    path: '/user-home/:id',
    name: 'user-home',
    component: () => import('../views/UserHome.vue'),
  },
  {
    path: '/post-article/:id',
    name: 'post-article',
    component: () => import('../views/PostArticle.vue'),
  },
  {
    path: '/edit-article/:id',
    name: 'edit-article',
    component: () => import('../views/EditArticle.vue'),
  },
  {
    path: '/edit-account/:id',
    name: 'edit-account',
    component: () => import('../views/EditAccount.vue'),
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

export default router
