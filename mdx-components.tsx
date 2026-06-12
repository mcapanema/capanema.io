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
          className="mt-12 scroll-mt-28 text-2xl font-semibold leading-[1.3] tracking-[-0.3px] text-text-primary"
        >
          {children}
        </h2>
      );
    },
    h3: ({ children }) => (
      <h3 className="mt-8 scroll-mt-28 text-xl font-semibold leading-[1.4] text-text-primary">
        {children}
      </h3>
    ),
    p: ({ children }) => (
      <p className="mt-6 text-lg leading-[1.7] text-text-prose">{children}</p>
    ),
    a: ({ children, href }) => (
      <a
        href={href}
        className="font-medium text-link underline underline-offset-2 transition-colors hover:text-link-hover"
      >
        {children}
      </a>
    ),
    ul: ({ children }) => (
      <ul className="mt-6 flex list-disc flex-col gap-2 pl-6 text-lg leading-[1.7] text-text-prose marker:text-text-tertiary">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="mt-6 flex list-decimal flex-col gap-2 pl-6 text-lg leading-[1.7] text-text-prose marker:text-text-tertiary">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="pl-1">{children}</li>,
    strong: ({ children }) => (
      <strong className="font-semibold text-text-primary">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,
    blockquote: ({ children }) => (
      <blockquote className="mt-8 border-l-[3px] border-border-accent pl-6 text-lg italic leading-[1.7] text-text-secondary">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="mt-10 border-t border-border-subtle" />,
    code: ({ children }) => (
      <code className="rounded border border-border-subtle bg-surface-secondary px-1.5 py-0.5 font-mono text-[0.9em] text-text-primary">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="mt-6 overflow-x-auto rounded-xl border border-border-subtle bg-surface-secondary p-5 text-sm leading-[1.6] [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0">
        {children}
      </pre>
    ),
    img: (props) => (
      // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
      <img
        {...props}
        className="mt-8 w-full rounded-xl border border-border-subtle"
      />
    ),
    table: ({ children }) => (
      <div className="mt-8 overflow-x-auto rounded-xl border border-border-subtle">
        <table className="w-full border-collapse text-left text-base">
          {children}
        </table>
      </div>
    ),
    th: ({ children }) => (
      <th className="border-b border-border-subtle bg-surface-secondary px-4 py-3 font-semibold text-text-primary">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="border-b border-border-subtle px-4 py-3 text-text-prose">
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
