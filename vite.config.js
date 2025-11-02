// vite.config.js
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const VITE_PROXY_TARGET = env.VITE_PROXY_TARGET

  return {
    plugins: [react(), tailwindcss()],
    server: {
      host: true, 
      port: 5173,
      ...(VITE_PROXY_TARGET && {
        proxy: {
          '/api': {
            target: VITE_PROXY_TARGET,
            changeOrigin: true,
            secure: false,
          }
        }
      })
    }
  }
})