import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

export interface SourceProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  /** Where the ink came from — also the link text when no children are
   * given; opens in a new tab, referrer-free. */
  href: string;
}

/** One place the ink came from; href and the rest ride the anchor. */
export function Source(props: SourceProps) {
  const [own, rest] = splitProps(props, ["href", "children"]);
  return (
    <li data-scope="ai" data-part="source">
      <a {...rest} href={own.href} target="_blank" rel="noreferrer">
        {own.children ?? own.href}
      </a>
    </li>
  );
}

/** The reading list under a response: where this ink came from. */
export function Sources(props: JSX.HTMLAttributes<HTMLOListElement>) {
  return <ol {...props} data-scope="ai" data-part="sources" />;
}

injectComponentStyle("ai");

export { Source as AiSource, Sources as AiSources };
