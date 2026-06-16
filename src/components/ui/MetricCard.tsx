// DS master: Metric Card (xAD0x). radius 12, surface-elevated, border-subtle,
// soft shadow (shadow-1a), padding space-6. Optional mono eyebrow in
// text-tertiary (neutral — v3.1 structural accent), value Inter 40/600, label
// text-secondary.
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
    <div className="border-border-subtle bg-surface-elevated flex w-full flex-col gap-2 rounded-xl border p-8 shadow-[0_1px_3px_var(--shadow-1a)]">
      {eyebrow && (
        <span className="text-text-tertiary font-mono text-xs tracking-[1px]">
          {eyebrow}
        </span>
      )}
      <span className="text-text-primary text-[40px] leading-[1.1] font-semibold tracking-[-0.8px]">
        {value}
      </span>
      <span className="text-text-secondary text-sm">{label}</span>
    </div>
  );
}
