export function SkipToContent() {
  return (
    <a
      href="#main-content"
      className="absolute -top-[9999px] left-4 focus:top-4 z-50 rounded-(--radius-md) bg-surface-elevated px-4 py-2 font-medium text-text-primary shadow-[0_4px_12px_var(--shadow-1b)] border border-border-default transition-colors"
    >
      Skip to main content
    </a>
  );
}
