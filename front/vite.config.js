import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  root: '.',
  plugins: [react()],
  build:{
    outDir: '../dist'
  },
  server: {
    watch: {
    usePolling: true,
    },
    host: true,
    strictPort: true,
    port: 5173, 
  }
})
