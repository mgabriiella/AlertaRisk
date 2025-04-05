import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  server: {
    port: 3000, // Porta fixa para o servidor de desenvolvimento
    strictPort: true // Opcional: faz o Vite falhar se a porta estiver ocupada, em vez de escolher outra
  }
});