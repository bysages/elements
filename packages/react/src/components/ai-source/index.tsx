import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes, ReactNode } from "react";

import { withSelfRoot } from "../../internal/family";

/** One place the ink came from; href and the rest ride the anchor. */
export interface SourceProps extends HTMLAttributes<HTMLAnchorElement> {
  /** Where the ink came from — also the link text when no children are
   * given; opens in a new tab, referrer-free. */
  href: string;
  children?: ReactNode;
}

function SourceImpl({ href, children, ...rest }: SourceProps) {
  injectComponentStyle("ai");
  return (
    <li data-scope="ai" data-part="source">
      <a {...rest} href={href} target="_blank" rel="noreferrer">
        {children ?? href}
      </a>
    </li>
  );
}

export const Source = withSelfRoot(SourceImpl);

/** The reading list under a response: where this ink came from. */
export interface SourcesProps extends HTMLAttributes<HTMLOListElement> {
  children?: ReactNode;
}

function SourcesImpl({ children, ...rest }: SourcesProps) {
  return (
    <ol {...rest} data-scope="ai" data-part="sources">
      {children}
    </ol>
  );
}

export const Sources = withSelfRoot(SourcesImpl);
export { Source as AiSource, Sources as AiSources };
