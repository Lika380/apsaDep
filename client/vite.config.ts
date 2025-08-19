import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/', // абсолютный базовый путь
  plugins: [react()],
})
