import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import '@/assets/tailwind.css'
import '@/store/subscriber'

import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'

store.dispatch('attempt', localStorage.getItem('token')).then(() => {
  createApp(App).use(store).use(router).mount('#app')
})
