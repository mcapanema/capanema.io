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
    <figure className="border-border-accent flex flex-col gap-3 border-l-[3px] py-2 pr-2 pl-6">
      <blockquote className="text-text-primary text-h4 font-medium">
        {children}
      </blockquote>
      {attribution && (
        <figcaption className="text-text-tertiary font-mono text-xs">
          {attribution}
        </figcaption>
      )}
    </figure>
  );
}
