import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './routes'
import axios from 'axios'
import VueToast from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'


// Axios interceptor to handle 401 and 404 responses
axios.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        const status = error.response.status
        if (status === 401) {
          // Handle Unauthorized: Remove token and redirect to login
          localStorage.removeItem('token')
          router.push({ name: 'Login' })
        } else if (status === 404) {
          // Handle Not Found: Log the error and optionally redirect
          console.error(`Resource not found: ${error.response.config.url}`)          
          router.push({ name: 'NotFound' })
        }
      }
      return Promise.reject(error)
    }
)


createApp(App)
    .use(router)
    .use(VueToast)
    .mount('#app')
