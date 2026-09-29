import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

/** A ledger laid flat: term and detail pairs in one quiet grid. The
 * horizontal layout reads as a table of two columns; the vertical one
 * stacks each pair for narrow measures. */
export interface DescriptionsRootProps extends HTMLAttributes<HTMLDListElement> {
  layout?: "horizontal" | "vertical";
  /** The framed register: one hairline round the whole, terms on
   * inset paper. */
  bordered?: boolean;
  /** Pairs across the grid: one ledger per column. */
  column?: number;
}

export function DescriptionsRoot({
  layout = "horizontal",
  bordered = false,
  column = 1,
  children,
  ...rest
}: DescriptionsRootProps) {
  injectComponentStyle("descriptions");
  return (
    <dl
      {...rest}
      data-scope="descriptions"
      data-part="root"
      data-layout={layout}
      data-bordered={bordered || undefined}
      style={
        {
          ...rest.style,
          "--bs-desc-columns": String(column),
        } as HTMLAttributes<HTMLDListElement>["style"]
      }
    >
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

function DescriptionsItem({
  span = 1,
  children,
  ...rest
}: HTMLAttributes<HTMLDivElement> & { span?: number }) {
  return (
    <div
      {...rest}
      style={
        {
          ...rest.style,
          "--bs-desc-span": String(span * 2),
        } as HTMLAttributes<HTMLDivElement>["style"]
      }
      data-scope="descriptions"
      data-part="item"
    >
      {children}
    </div>
  );
}
DescriptionsItem.displayName = "DescriptionsItem";

const Term = part("Term", "dt");
const Detail = part("Detail", "dd");

export const Descriptions = { Root: DescriptionsRoot, Item: DescriptionsItem, Term, Detail };
