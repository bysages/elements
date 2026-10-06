import { injectComponentStyle } from "@bysages/core";
import type { CSSProperties, SetupContext } from "vue";
import { defineComponent, h } from "vue";

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
export interface MasonryProps {
  columns?: number;
  /** A stone's narrowest measure — the browser then drops columns on a
   * narrow wall instead of squeezing past this floor. */
  minColumn?: string;
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
}

export const Masonry = withSelfRoot(
  defineComponent({
    name: "Masonry",
    props: {
      columns: { type: Number, default: 3 },
      minColumn: { type: String, default: undefined },
      gap: { type: String, default: "md" },
    },
    setup(props, ctx: SetupContext) {
      injectComponentStyle("masonry");

      return () => {
        const { style, ...attrs } = ctx.attrs;
        return h(
          "div",
          {
            ...attrs,
            style: [
              style as CSSProperties,
              {
                "--bs-masonry-columns": String(props.columns),
                "--bs-masonry-column-min": props.minColumn,
                "--bs-masonry-gap": gapVars[props.gap] ?? gapVars.md,
              },
            ],
            "data-scope": "masonry",
            "data-part": "root",
          },
          ctx.slots.default?.(),
        );
      };
    },
  }),
);
