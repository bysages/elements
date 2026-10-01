import { injectComponentStyle } from "@bysages/core";
import type { CSSProperties, HTMLAttributes, ReactNode } from "react";

export interface BentoProps extends HTMLAttributes<HTMLDivElement> {
  /** Tracks across the lattice. */
  columns?: number;
  children?: ReactNode;
}

export interface BentoCellProps extends HTMLAttributes<HTMLDivElement> {
  /** Columns this tile claims. */
  span?: number;
  /** Rows this tile claims. */
  rowSpan?: number;
  children?: ReactNode;
}

/** The bento lattice: a grid of unequal tiles that reads as one plate.
 * The container owns the track count; each cell claims its own span. */
export function BentoRoot({ columns = 3, children, ...rest }: BentoProps) {
  injectComponentStyle("bento");

  return (
    <div
      {...rest}
      data-scope="bento"
      data-part="root"
      style={
        {
          ...rest.style,
          "--bs-bento-columns": String(columns),
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

/** One tile: `span` claims columns, `rowSpan` claims rows — the rest
 * of the plate stays in measure. */
export function BentoCell({ span = 1, rowSpan = 1, children, ...rest }: BentoCellProps) {
  injectComponentStyle("bento");

  return (
    <div
      {...rest}
      data-scope="bento"
      data-part="cell"
      style={
        {
          ...rest.style,
          "--bs-bento-span-x": String(span),
          "--bs-bento-span-y": String(rowSpan),
        } as CSSProperties
      }
    >
      {children}
    </div>
  );
}

/** The whole family under one handle — Bento.Root, Bento.Cell. */
export const Bento = Object.assign(BentoRoot, { Root: BentoRoot, Cell: BentoCell });
