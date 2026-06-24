export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 z-50 rounded-[var(--radius-md)] bg-surface-elevated px-4 py-2 font-medium text-text-primary shadow-[0_4px_12px_var(--shadow-1b)] border border-border-default transition-colors"
    >
      Skip to main content
    </a>
  );
}
