// DS master: Credibility Strip (xTEMM). Vertical, gap space-4. Mono eyebrow in
// text-tertiary, then a wrapping row of company wordmarks (Inter 20/600,
// text-tertiary).
export function CredibilityStrip({
  eyebrow = "LEADERSHIP ACROSS TEAMS AT",
  companies,
}: {
  eyebrow?: string;
  companies: string[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <span className="font-mono text-xs tracking-[1px] text-text-tertiary">
        {eyebrow}
      </span>
      <div className="flex flex-wrap items-center gap-x-12 gap-y-4">
        {companies.map((c) => (
          <span
            key={c}
            className="text-xl font-semibold tracking-[-0.3px] text-text-tertiary"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
