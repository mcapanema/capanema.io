import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import { Children } from "react";
import { Callout, Pullquote, Tag, Metric } from "@/components/ui";
import { slugify } from "@/content/types";

// Flatten MDX heading children to a plain string for anchor-id generation.
function toText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(toText).join("");
  let out = "";
  Children.forEach(node as ReactNode, (child) => {
    if (typeof child === "string" || typeof child === "number") {
      out += String(child);
    } else if (child && typeof child === "object" && "props" in child) {
      out += toText((child as { props: { children?: ReactNode } }).props.children);
    }
  });
  return out;
}

// The DS prose reading system: Body L (18/1.7) on text-prose, headings on the
// type scale, tokenised links/code/tables. Vertical rhythm via margins; the
// template strips the leading top margin. Pullquote/Callout/Metric/Tag are
// exposed so case-study MDX can compose DS primitives directly.
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: ({ children }) => {
      const id = slugify(toText(children));
      return (
        <h2
          id={id}
          className="text-text-primary mt-12 scroll-mt-28 text-2xl leading-[1.3] font-semibold tracking-[-0.3px]"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }) => (
      <h3 className="text-text-primary mt-8 scroll-mt-28 text-xl leading-[1.4] font-semibold">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="text-text-prose mt-6 text-lg font-medium leading-[1.7]">{children}</p>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        className="text-link hover:text-link-hover font-medium underline underline-offset-2 transition-colors"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="text-text-prose marker:text-text-tertiary mt-6 flex list-disc flex-col gap-2 pl-6 text-lg font-medium leading-[1.7]">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="text-text-prose marker:text-text-tertiary mt-6 flex list-decimal flex-col gap-2 pl-6 text-lg font-medium leading-[1.7]">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="pl-1">{children}</li>,
    strong: ({ children }) => (
      <strong className="text-text-primary font-semibold">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    blockquote: ({ children }) => (
      <blockquote className="border-border-accent text-text-secondary mt-8 border-l-[3px] pl-6 text-lg font-medium leading-[1.7] italic">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="border-border-subtle mt-10 border-t" />,
    code: ({ children }) => (
      <code className="border-border-subtle bg-surface-secondary text-text-primary rounded border px-1.5 py-0.5 font-mono text-[0.9em]">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="border-border-subtle bg-surface-secondary mt-6 overflow-x-auto rounded-xl border p-5 text-sm leading-[1.6] [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0">
        {children}
      </pre>
    ),
    img: (props) => (
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      <img
        {...props}
        className="mt-8 w-full rounded-xl border border-border-subtle shadow-[0_2px_4px_var(--shadow-1a),0_4px_12px_var(--shadow-1a)]"
      />
    ),
    table: ({ children }) => (
      <div className="border-border-subtle mt-8 overflow-x-auto rounded-xl border">
        <table className="w-full border-collapse text-left text-base">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-border-subtle bg-surface-secondary text-text-primary border-b px-4 py-3 font-semibold">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-border-subtle text-text-prose border-b px-4 py-3 font-medium">
        {children}
      </td>
    ),
    Callout,
    Pullquote,
    Tag,
    Metric,
    ...components,
  };
}
