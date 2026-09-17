import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes, ReactNode } from "react";

/** One place the ink came from; href and the rest ride the anchor. */
export interface SourceProps extends HTMLAttributes<HTMLAnchorElement> {
  /** Where the ink came from — also the link text when no children are
   * given; opens in a new tab, referrer-free. */
  href: string;
  children?: ReactNode;
}

export function Source({ href, children, ...rest }: SourceProps) {
  return (
    <li data-scope="ai" data-part="source">
      <a {...rest} href={href} target="_blank" rel="noreferrer">
        {children ?? href}
      </a>
    </li>
  );
}

/** The reading list under a response: where this ink came from. */
export interface SourcesProps extends HTMLAttributes<HTMLOListElement> {
  children?: ReactNode;
}

export function Sources({ children, ...rest }: SourcesProps) {
  return (
    <ol {...rest} data-scope="ai" data-part="sources">
      {children}
    </ol>
  );
}

injectComponentStyle("ai");

export { Source as AiSource, Sources as AiSources };
