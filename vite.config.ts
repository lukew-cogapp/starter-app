import { readFileSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vitest/config'

// Read here rather than importing package.json into a component: that would inline
// the whole manifest, devDependency names and all, into the client bundle.
const { repository } = JSON.parse(readFileSync('./package.json', 'utf8'))
const repoUrl = repository.url.replace(/^git\+/, '').replace(/\.git$/, '')

const base = process.env.BASE_PATH ?? '/'

// start_url and scope have to carry the same prefix as the assets, so the manifest
// is generated alongside the build rather than committed as a static file.
function webManifest(): Plugin {
  return {
    name: 'web-manifest',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'manifest.webmanifest',
        source: JSON.stringify(
          {
            name: 'Starter App',
            short_name: 'Starter',
            description: 'React SPA starter.',
            start_url: base,
            scope: base,
            display: 'standalone',
            background_color: '#ffffff',
            theme_color: '#ffffff',
            icons: [
              { src: `${base}icon-192.png`, sizes: '192x192', type: 'image/png' },
              { src: `${base}icon-512.png`, sizes: '512x512', type: 'image/png' },
              {
                src: `${base}icon-512.png`,
                sizes: '512x512',
                type: 'image/png',
                purpose: 'maskable',
              },
            ],
          },
          null,
          2,
        ),
      })
    },
  }
}

// GitHub Pages serves project sites from /<repo>/, so assets need that prefix.
// CI sets BASE_PATH from the repo name; local dev and user/org sites stay at /.
export default defineConfig({
  base,
  define: { __REPO_URL__: JSON.stringify(repoUrl) },
  plugins: [react(), tailwindcss(), webManifest()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/test/setup.ts',
    css: true,
  },
})
