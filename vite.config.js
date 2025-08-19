import { defineConfig } from 'vite'

// Defina o nome do seu repositório aqui
const repoName = 'ufjf-dcc206-2025-1-a-trb-canastra';

export default defineConfig({
  // O caminho base da sua aplicação para o GitHub Pages
  base: `/${repoName}/`,
  plugins: [], // Se você tiver plugins, mantenha-os aqui
})