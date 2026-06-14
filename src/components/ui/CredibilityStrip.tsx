// DS master: Credibility Strip (xTEMM). Vertical, gap space-4. Mono eyebrow in
// text-tertiary, then a row of company wordmarks (Inter 20/600, text-tertiary).
// On mobile (< md) the wordmarks form a single horizontal scroll row to stay
// compact; from md up they wrap across lines (the original DS layout).
export function CredibilityStrip({
  eyebrow = "LEADERSHIP ACROSS TEAMS AT",
  companies,
}: {
  eyebrow?: string;
  companies: string[];
}) {
  return (
    <div className="flex flex-col gap-4">
      <span className="text-text-tertiary font-mono text-xs tracking-[1px]">
        {eyebrow}
      </span>
      <div className="flex [scrollbar-width:none] items-center gap-x-8 overflow-x-auto md:flex-wrap md:gap-x-12 md:gap-y-4 md:overflow-visible [&::-webkit-scrollbar]:hidden">
        {companies.map((c) => (
          <span
            key={c}
            className="text-text-tertiary shrink-0 text-xl font-semibold tracking-[-0.3px] whitespace-nowrap"
          >
            {c}
          </span>
        ))}
      </div>
    </div>
  );
}
