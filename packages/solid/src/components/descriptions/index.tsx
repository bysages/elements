import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

/**
 * A ledger laid flat: term and detail pairs in one quiet grid. The
 * horizontal layout reads as a table of two columns; the vertical one
 * stacks each pair for narrow measures.
 */
export interface DescriptionsRootProps extends JSX.HTMLAttributes<HTMLDListElement> {
  layout?: "horizontal" | "vertical";
  /** The framed register: one hairline round the whole, terms on
   * inset paper. */
  bordered?: boolean;
  /** Pairs across the grid: one ledger per column. */
  column?: number;
}

function Root(props: DescriptionsRootProps) {
  const [own, rest] = splitProps(props, ["layout", "bordered", "column", "style"]);
  return (
    <dl
      {...rest}
      style={{ ...(own.style as object), "--bs-desc-columns": String(own.column ?? 1) }}
      data-scope="descriptions"
      data-part="root"
      data-layout={own.layout ?? "horizontal"}
      data-bordered={own.bordered || undefined}
    />
  );
}

function part(name: string, tag: string) {
  function Component(props: JSX.HTMLAttributes<HTMLDivElement>) {
    const Tag = tag as "div";
    return <Tag {...props} data-scope="descriptions" data-part={name.toLowerCase()} />;
  }
  return Component;
}

function Item(props: JSX.HTMLAttributes<HTMLDivElement> & { span?: number }) {
  const [own, rest] = splitProps(props, ["span", "style"]);
  return (
    <div
      {...rest}
      style={{ ...(own.style as object), "--bs-desc-span": String((own.span ?? 1) * 2) }}
      data-scope="descriptions"
      data-part="item"
    />
  );
}

const Term = part("Term", "dt");
const Detail = part("Detail", "dd");

export const Descriptions = Object.assign(Root, { Root, Item, Term, Detail });

injectComponentStyle("descriptions");
