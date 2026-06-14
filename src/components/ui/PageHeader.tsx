// Shared page header — mirrors the "Header" frame present in every DS pattern
// (mono eyebrow, H1 title, Body L description). One <h1> per page.
export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="flex max-w-[820px] flex-col gap-4">
      {eyebrow && (
        <span className="text-text-accent font-mono text-sm tracking-[1px]">
          {eyebrow}
        </span>
      )}
      <h1 className="text-text-primary text-[36px] leading-[1.1] font-semibold tracking-[-0.8px] sm:text-5xl sm:tracking-[-1px]">
        {title}
      </h1>
      {description && (
        <p className="text-text-secondary text-lg leading-[1.6]">
          {description}
        </p>
      )}
    </div>
  );
}
