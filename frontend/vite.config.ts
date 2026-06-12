import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  // so that Github Pages serves under this repo
  base: process.env.GITHUB_PAGES ? '/codebase-vite-react-typescript-tailwindcss-nodejs/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': 'http://localhost:3001'
    }
  },
})
