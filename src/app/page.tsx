export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-24 bg-white dark:bg-zinc-950">
      <div className="w-full max-w-2xl">

        {/* Identity */}
        <div className="mb-12">
          <p className="text-xs font-medium tracking-widest uppercase text-zinc-400 dark:text-zinc-500 mb-4">
            Engineering Leadership
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50 leading-tight mb-5">
            Murilo Capanema
          </h1>
          <p className="text-lg text-zinc-500 dark:text-zinc-400 leading-relaxed max-w-lg">
            I build and lead engineering teams that ship products people rely on.
            This is a record of the work behind them.
          </p>
        </div>

        {/* Divider */}
        <div className="w-12 h-px bg-zinc-200 dark:bg-zinc-800 mb-12" />

        {/* Navigation cards */}
        <nav className="flex flex-col gap-3">
          <a
            href="/case-studies"
            className="group flex items-center justify-between p-5 rounded-xl border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800/60 transition-all duration-200"
          >
            <div className="space-y-0.5">
              <p className="font-medium text-zinc-900 dark:text-zinc-100">
                Case Studies
              </p>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                Deep dives into problems I&apos;ve led teams through
              </p>
            </div>
            <span className="text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all duration-200 text-lg">
              →
            </span>
          </a>

          <a
            href="/resume"
            className="group flex items-center justify-between p-5 rounded-xl border border-zinc-100 dark:border-zinc-800/80 bg-zinc-50 dark:bg-zinc-900 hover:border-zinc-300 dark:hover:border-zinc-700 hover:bg-white dark:hover:bg-zinc-800/60 transition-all duration-200"
          >
            <div className="space-y-0.5">
              <p className="font-medium text-zinc-900 dark:text-zinc-100">
                Resume
              </p>
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                Background, experience, and skills
              </p>
            </div>
            <span className="text-zinc-300 dark:text-zinc-600 group-hover:text-zinc-500 dark:group-hover:text-zinc-400 group-hover:translate-x-0.5 transition-all duration-200 text-lg">
              →
            </span>
          </a>
        </nav>

        {/* Footer */}
        <p className="mt-16 text-xs text-zinc-300 dark:text-zinc-700">
          murilo.capanema@gmail.com
        </p>

      </div>
    </main>
  );
}
