import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
const path = require('path')

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: { '@': path.resolve(__dirname, 'src') },
  },
  server: {
    host: true,
    port: 8080,
    proxy: {
      '/auth': {
        target: 'http://localhost:3000/',
        changeOrigin: true,
      },
    },
  },
})
