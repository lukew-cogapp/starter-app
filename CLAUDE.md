# CLAUDE.md

React SPA template. Vite, TypeScript strict, Tailwind v4, Biome, Vitest, Lefthook,
deployed to GitHub Pages by Actions.

## Commands

```sh
npm run dev         # dev server (the user runs this, not Claude)
npm test            # vitest run
npm run lint        # biome check .
npm run format      # biome check --write .
npm run typecheck   # tsc -b --noEmit
npm run build       # tsc -b && vite build
```

After significant work run `npm run format`, `npm run typecheck` and `npm test`.

## Conventions

- Biome for lint and format. Never ESLint or Prettier.
- Tailwind v4 configures itself in CSS. `src/index.css` holds `@import 'tailwindcss'`;
  there is no `tailwind.config.js` and adding one is not the v4 way. Put theme
  customisation in an `@theme` block in that file.
- Tests sit next to the code as `*.test.tsx`, using Testing Library. Query by role
  and accessible name, not by test id.
- `src/test/setup.ts` registers the jest-dom matchers and cleans up after each test.
- Vitest config lives in the `test` key of `vite.config.ts`, which is why that file
  imports `defineConfig` from `vitest/config` rather than from `vite`.

## Deployment

`.github/workflows/deploy.yml` builds on push to `main`. It sets `BASE_PATH` from the
repo name because a project site is served from `/<repo>/`, and Vite bakes that prefix
into asset URLs at build time. Hardcoding `base` in `vite.config.ts` would break every
repo made from this template except one.

The build also copies `index.html` to `404.html`. Pages has no rewrite rules, so that
copy is what keeps a refreshed client-side route from 404ing. Keep it if you add a
router.

## The repo URL

The footer link comes from `__REPO_URL__`, a Vite `define` fed by the `repository`
field in `package.json`. A repo made from this template updates that one field.
Importing `package.json` into a component instead would inline the whole manifest,
devDependency names included, into the client bundle.
