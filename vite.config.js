import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Update 'base' to match your GitHub repo name for GitHub Pages deployment
// e.g., if your repo is github.com/username/recipe-book, set base: '/recipe-book/'
export default defineConfig({
  plugins: [react()],
  base: '/recipe-book/',
})
