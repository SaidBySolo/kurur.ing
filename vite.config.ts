import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      $fonts: resolve("./src/assets/fonts"),
      $sprite: resolve("./src/assets/sprite")
    }
  },
  plugins: [react()],
})
