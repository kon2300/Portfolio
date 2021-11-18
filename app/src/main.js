import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/assets/tailwind.css'
import '@/store/subscriber'

import axios from 'axios'
axios.defaults.baseURL = import.meta.env.VITE_API_URL

store.dispatch('attempt', localStorage.getItem('token')).then(() => {
  createApp(App).use(store).use(router).mount('#app')
})
