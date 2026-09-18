import { injectComponentStyle } from "@bysages/core";
import type { CSSProperties, HTMLAttributes } from "react";

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

export function Masonry({ columns = 3, gap = "md", ...rest }: MasonryProps) {
  const style = {
    ...rest.style,
    "--bs-masonry-columns": String(columns),
    "--bs-masonry-gap": gapVars[gap] ?? gapVars.md,
  } as CSSProperties;

  return <div {...rest} style={style} data-scope="masonry" data-part="root" />;
}

injectComponentStyle("masonry");
