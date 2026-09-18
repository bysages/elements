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

/** An alignment lattice: tracks of equal measure, sized by column count
 * — or, with `minChildWidth`, as many tracks as the container fits. */
export interface GridProps extends HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  /** Switch to the auto-fill lattice: each track is at least this wide,
   * and the container decides how many fit. */
  minChildWidth?: string;
}

export function Grid({ columns = 12, gap = "md", minChildWidth, ...rest }: GridProps) {
  const style = {
    ...rest.style,
    "--bs-grid-columns": String(columns),
    "--bs-grid-gap": gapVars[gap] ?? gapVars.md,
    ...(minChildWidth != null ? { "--bs-grid-min-child-width": minChildWidth } : {}),
  } as CSSProperties;

  return (
    <div
      {...rest}
      style={style}
      data-scope="grid"
      data-part="root"
      data-autofill={minChildWidth != null ? "" : undefined}
    />
  );
}

injectComponentStyle("grid");
