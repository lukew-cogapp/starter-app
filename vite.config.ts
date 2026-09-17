import { readFileSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// Read here rather than importing package.json into a component: that would inline
// the whole manifest, devDependency names and all, into the client bundle.
const { repository } = JSON.parse(readFileSync('./package.json', 'utf8'))
const repoUrl = repository.url.replace(/^git\+/, '').replace(/\.git$/, '')

// GitHub Pages serves project sites from /<repo>/, so assets need that prefix.
// CI sets BASE_PATH from the repo name; local dev and user/org sites stay at /.
export default defineConfig({
  base: process.env.BASE_PATH ?? '/',
  define: { __REPO_URL__: JSON.stringify(repoUrl) },
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
