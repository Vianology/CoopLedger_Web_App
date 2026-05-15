import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: "/",          // ← "/" au lieu de "./" pour Render
  server: {
    host: true
  }
})