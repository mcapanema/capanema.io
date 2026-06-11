export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center min-h-screen px-6 py-24">
      <div className="max-w-2xl w-full space-y-8">
        <header className="space-y-3">
          <h1 className="text-4xl font-bold tracking-tight">
            Murilo Capanema
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400">
            Product & engineering portfolio
          </p>
        </header>

        <nav className="flex flex-col gap-4 pt-4 border-t border-zinc-200 dark:border-zinc-800">
          <a
            href="/case-studies"
            className="group flex items-center justify-between rounded-lg p-4 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
          >
            <div>
              <p className="font-medium">Case Studies</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Deep dives into problems I&apos;ve solved
              </p>
            </div>
            <span className="text-zinc-400 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>

          <a
            href="/resume"
            className="group flex items-center justify-between rounded-lg p-4 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-400 dark:hover:border-zinc-600 transition-colors"
          >
            <div>
              <p className="font-medium">Resume</p>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">
                Experience, skills, and background
              </p>
            </div>
            <span className="text-zinc-400 group-hover:translate-x-1 transition-transform">
              →
            </span>
          </a>
        </nav>
      </div>
    </main>
  );
}
