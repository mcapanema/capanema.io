// DS master: Metric (N323Wn). Value Inter 40/600, tracking -0.8, leading 1.1;
// label Inter 14 text-secondary. Vertical, gap space-1.
export function Metric({
  value,
  label,
}: {
  value: React.ReactNode;
  label: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-[40px] font-semibold leading-[1.1] tracking-[-0.8px] text-text-primary">
        {value}
      </span>
      <span className="text-sm text-text-secondary">{label}</span>
    </div>
  );
}
