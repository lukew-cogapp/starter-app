# starter-app

React SPA template: Vite, TypeScript (strict), Tailwind v4, Biome, Vitest, Lefthook,
GitHub Actions CI and GitHub Pages deploy.

## Use

Click **Use this template** on GitHub, then:

```sh
npm install   # also installs the Lefthook pre-commit hooks
npm run dev
```

## Scripts

| Script | Does |
| --- | --- |
| `npm run dev` | Dev server |
| `npm run build` | Typecheck and build to `dist/` |
| `npm run preview` | Serve the built `dist/` |
| `npm test` | Run tests once |
| `npm run test:watch` | Tests in watch mode |
| `npm run test:coverage` | Tests with a v8 coverage report |
| `npm run lint` | Biome check |
| `npm run format` | Biome check with fixes applied |
| `npm run typecheck` | `tsc -b --noEmit` |

## Deploying

Pushing to `main` builds and deploys to GitHub Pages. Enable it once per repo:
**Settings → Pages → Build and deployment → Source: GitHub Actions**.

The workflow sets Vite's `base` from the repo name, so a project site at
`/<repo>/` and a `<user>.github.io` site at `/` both work without edits. It also
copies `index.html` to `404.html` so client-side routes survive a page refresh.
