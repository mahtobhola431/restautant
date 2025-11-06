import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  base: '/', // ✅ ensures correct routing on Vercel
  build: {
    outDir: 'dist', // ✅ make sure build output goes to dist
  },
  server: {
    port: 5173,
  },
})
