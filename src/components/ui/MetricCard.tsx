// DS master: Metric Card (xAD0x). radius 12, surface-elevated, border-subtle,
// soft shadow (shadow-1a), padding space-6. Optional mono eyebrow in text-accent,
// value Inter 40/600, label text-secondary.
export function MetricCard({
  eyebrow,
  value,
  label,
}: {
  eyebrow?: React.ReactNode;
  value: React.ReactNode;
  label: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col gap-2 rounded-xl border border-border-subtle bg-surface-elevated p-8 shadow-[0_1px_3px_var(--shadow-1a)]">
      {eyebrow && (
        <span className="font-mono text-xs tracking-[1px] text-text-accent">
          {eyebrow}
        </span>
      )}
      <span className="text-[40px] font-semibold leading-[1.1] tracking-[-0.8px] text-text-primary">
        {value}
      </span>
      <span className="text-sm text-text-secondary">{label}</span>
    </div>
  );
}
