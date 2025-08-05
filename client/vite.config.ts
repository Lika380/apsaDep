import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './', // ✅ или '/', если деплоишь в корень
  plugins: [react()],
})
