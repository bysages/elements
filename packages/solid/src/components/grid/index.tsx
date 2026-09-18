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

/** An alignment lattice: tracks of equal measure, sized by column count
 * — or, with `minChildWidth`, as many tracks as the container fits. */
export interface GridProps extends JSX.HTMLAttributes<HTMLDivElement> {
  columns?: number;
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  /** Switch to the auto-fill lattice: each track is at least this wide,
   * and the container decides how many fit. */
  minChildWidth?: string;
}

export function Grid(props: GridProps) {
  const [own, rest] = splitProps(props, ["columns", "gap", "minChildWidth"]);
  return (
    <div
      {...rest}
      style={{
        ...(rest.style as JSX.CSSProperties),
        "--bs-grid-columns": String(own.columns ?? 12),
        "--bs-grid-gap": gapVars[own.gap ?? "md"] ?? gapVars.md,
        ...(own.minChildWidth != null ? { "--bs-grid-min-child-width": own.minChildWidth } : {}),
      }}
      data-scope="grid"
      data-part="root"
      data-autofill={own.minChildWidth != null ? "" : undefined}
    />
  );
}

injectComponentStyle("grid");
