import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      '/api': 'web-production-37198.up.railway.app'
    },

    allowedHosts: ['agenteprototipofront-production.up.railway.app']
  }
})
