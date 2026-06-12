// DS master: Metric (N323Wn). Value Inter 40/600, tracking -0.8, leading 1.1;
// label Inter 14 text-secondary. The DS reuses this master on dark panels with
// on-dark colour overrides — exposed here as the `onDark` tone.
export function Metric({
  value,
  label,
  tone = "default",
}: {
  value: React.ReactNode;
  label: React.ReactNode;
  tone?: "default" | "onDark";
}) {
  const valueColor = tone === "onDark" ? "text-text-on-dark" : "text-text-primary";
  const labelColor =
    tone === "onDark" ? "text-text-on-dark-muted" : "text-text-secondary";
  return (
    <div className="flex flex-col gap-1">
      <span
        className={`text-[40px] font-semibold leading-[1.1] tracking-[-0.8px] ${valueColor}`}
      >
        {value}
      </span>
      <span className={`text-sm ${labelColor}`}>{label}</span>
    </div>
  );
}
