// DS master: Pullquote (oV5N6). Left accent border (3px), padding [space-2,
// space-6]. Quote Inter 24/500, tracking -0.3, leading 1.4; optional mono
// attribution in text-tertiary.
export function Pullquote({
  children,
  attribution,
}: {
  children: React.ReactNode;
  attribution?: React.ReactNode;
}) {
  return (
    <figure className="flex flex-col gap-3 border-l-[3px] border-border-accent py-2 pl-6 pr-2">
      <blockquote className="text-2xl font-medium leading-[1.4] tracking-[-0.3px] text-text-primary">
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="font-mono text-[13px] text-text-tertiary">
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}
