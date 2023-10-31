// Composables
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/default/Default.vue'),
    children: [
      {
        path: '',
        name: 'Home',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "home" */ '@/views/Home.vue'),
      },
    ],
  },
  {
    path: '/books',
    component: () => import('@/views/books.vue'),
    name: 'books'
  },
  {
    path: '/peoples',
    component: () => import('@/views/peoples.vue'),
    name: 'peoples'
  },
  {
    path: '/peoples/:id',
    component: () => import('@/views/peopleId.vue'),
    name: 'peoplesId'
  },
  {
    path: '/books/:id',
    component: () => import('@/views/bookId.vue'),
    name: 'booksId'
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router
