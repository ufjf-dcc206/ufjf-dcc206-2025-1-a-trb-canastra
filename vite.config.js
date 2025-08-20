import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // O caminho base da sua aplicação para o GitHub Pages
  base: `/ufjf-dcc206-2025-1-a-trb-canastra/`,
  plugins: [], // Se você tiver plugins, mantenha-os aqui
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        partida: resolve(__dirname, 'partida.html'),
        tutorial: resolve(__dirname, 'tutorial.html')
      }
    }
  }
})