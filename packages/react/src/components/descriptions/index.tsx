import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

/** A ledger laid flat: term and detail pairs in one quiet grid. The
 * horizontal layout reads as a table of two columns; the vertical one
 * stacks each pair for narrow measures. */
export interface DescriptionsRootProps extends HTMLAttributes<HTMLDListElement> {
  layout?: "horizontal" | "vertical";
}

export function DescriptionsRoot({
  layout = "horizontal",
  children,
  ...rest
}: DescriptionsRootProps) {
  return (
    <dl {...rest} data-scope="descriptions" data-part="root" data-layout={layout}>
      {children}
    </dl>
  );
}

function part(name: string, tag: "div" | "dt" | "dd") {
  const Tag = tag;
  const Component = ({ children, ...rest }: HTMLAttributes<HTMLElement>) => (
    <Tag {...rest} data-scope="descriptions" data-part={name.toLowerCase()}>
      {children}
    </Tag>
  );
  Component.displayName = "Descriptions" + name;
  return Component;
}

const Item = part("Item", "div");
const Term = part("Term", "dt");
const Detail = part("Detail", "dd");

export const Descriptions = { Root: DescriptionsRoot, Item, Term, Detail };

injectComponentStyle("descriptions");
