import { injectComponentStyle } from "@bysages/core/styling";
import type { CSSProperties, HTMLAttributes } from "react";

import { withSelfRoot } from "../../internal/family";

/** The same named steps of the space ramp the stack uses — one
 * vocabulary of distance across the layout primitives. */
const gapVars: Record<string, string> = {
  none: "0",
  xs: "var(--bs-gap-xs)",
  sm: "var(--bs-gap-sm)",
  md: "var(--bs-gap-md)",
  lg: "var(--bs-gap-lg)",
  xl: "var(--bs-gap-xl)",
};

/** A wall of uneven heights: items flow down each column before
 * crossing to the next, so the order is column-first. A row-flow wall
 * would need grid masonry, which browsers do not ship yet. */
export interface MasonryProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
}

function MasonryImpl({ columns = 3, gap = "md", ...rest }: MasonryProps) {
  injectComponentStyle("masonry");
  const style = {
    ...rest.style,
    "--bs-masonry-columns": String(columns),
    "--bs-masonry-gap": gapVars[gap] ?? gapVars.md,
  } as CSSProperties;

  return <div {...rest} style={style} data-scope="masonry" data-part="root" />;
}

export const Masonry = withSelfRoot(MasonryImpl);
