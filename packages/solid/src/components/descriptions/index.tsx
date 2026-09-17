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
}

function Root(props: DescriptionsRootProps) {
  const [own, rest] = splitProps(props, ["layout"]);
  return (
    <dl
      {...rest}
      data-scope="descriptions"
      data-part="root"
      data-layout={own.layout ?? "horizontal"}
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

const Item = part("Item", "div");
const Term = part("Term", "dt");
const Detail = part("Detail", "dd");

export const Descriptions = Object.assign(Root, { Root, Item, Term, Detail });

injectComponentStyle("descriptions");
