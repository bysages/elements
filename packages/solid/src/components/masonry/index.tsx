import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

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
export interface MasonryProps extends JSX.HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
}

export function Masonry(props: MasonryProps) {
  const [own, rest] = splitProps(props, ["columns", "gap"]);
  return (
    <div
      {...rest}
      style={{
        ...(rest.style as JSX.CSSProperties),
        "--bs-masonry-columns": String(own.columns ?? 3),
        "--bs-masonry-gap": gapVars[own.gap ?? "md"] ?? gapVars.md,
      }}
      data-scope="masonry"
      data-part="root"
    />
  );
}

injectComponentStyle("masonry");
