export default function App() {
  return (
    <div className="flex min-h-dvh flex-col bg-slate-950 text-slate-100">
      <main className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Starter App</h1>
        <p className="text-slate-400">React, Tailwind, Biome, Lefthook, TypeScript, Vitest.</p>
      </main>
      <footer className="border-t border-slate-800 px-6 py-4 text-center text-sm text-slate-400">
        <a className="underline underline-offset-4 hover:text-slate-100" href={__REPO_URL__}>
          View on GitHub
        </a>
      </footer>
    </div>
  )
}
