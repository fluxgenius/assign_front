// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Index.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Dashboard from '../views/Dashboard.vue'
import StudentSubmission from '../views/StudentSubmission.vue'
import StudentSearch from '../views/StudentSearch.vue'
import NotFound from '../views/NotFound.vue' 

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/submission',
    name: 'StudentSubmission',
    component: StudentSubmission
  },
  {
    path: '/search',
    name: 'StudentSearch',
    component: StudentSearch
  },
  {
    path: '/teacher/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/teacher/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/teacher/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    meta: { requiresAuth: true } 
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Global navigation guard
router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const token = localStorage.getItem('token')
  if (requiresAuth && !token) {
    next({ name: 'Login' })
  } else {
    next()
  }
})

export default router
