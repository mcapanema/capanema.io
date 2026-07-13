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
    <div className="flex max-w-205 flex-col gap-4">
      {eyebrow && (
        <span className="text-text-accent font-mono text-sm tracking-[1px]">
          {eyebrow}
        </span>
      )}
      <h1 className="text-text-primary text-h2 sm:text-h1 font-semibold">
        {title}
      </h1>
      {description && (
        <p className="text-text-secondary text-body-l">
          {description}
        </p>
      )}
    </div>
  );
}
