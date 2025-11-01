import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
const VITE_PROXY_TARGET = import.meta.env.VITE_PROXY_TARGET
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: true, 
    port: 5173,
    proxy: {
      '/api': {
        target: VITE_PROXY_TARGET,
        changeOrigin: true,
        secure: false,
      }
    }
  }
})
