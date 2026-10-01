import { injectComponentStyle } from "@bysages/core";
import type { JSX } from "solid-js";
import { splitProps } from "solid-js";

export interface BentoProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** Tracks across the lattice. */
  columns?: number;
}

export interface BentoCellProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** Columns this tile claims. */
  span?: number;
  /** Rows this tile claims. */
  rowSpan?: number;
}

/** The bento lattice: a grid of unequal tiles that reads as one plate.
 * The container owns the track count; each cell claims its own span. */
export function BentoRoot(props: BentoProps) {
  injectComponentStyle("bento");

  const [own, rest] = splitProps(props, ["columns"]);

  return (
    <div
      {...rest}
      data-scope="bento"
      data-part="root"
      style={{ "--bs-bento-columns": String(own.columns ?? 3) }}
    />
  );
}

/** One tile: `span` claims columns, `rowSpan` claims rows — the rest
 * of the plate stays in measure. */
export function BentoCell(props: BentoCellProps) {
  injectComponentStyle("bento");

  const [own, rest] = splitProps(props, ["span", "rowSpan"]);

  return (
    <div
      {...rest}
      data-scope="bento"
      data-part="cell"
      style={{
        "--bs-bento-span-x": String(own.span ?? 1),
        "--bs-bento-span-y": String(own.rowSpan ?? 1),
      }}
    />
  );
}
