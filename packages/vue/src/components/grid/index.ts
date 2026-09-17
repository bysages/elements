import { injectComponentStyle } from "@bysages/core";
import type { CSSProperties, SetupContext } from "vue";
import { defineComponent, h } from "vue";

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
export interface GridProps {
  columns?: number;
  gap?: "none" | "xs" | "sm" | "md" | "lg" | "xl";
  /** Switch to the auto-fill lattice: each track is at least this wide,
   * and the container decides how many fit. */
  minChildWidth?: string;
}

export const Grid = defineComponent({
  name: "Grid",
  props: {
    columns: { type: Number, default: 12 },
    gap: { type: String, default: "md" },
    minChildWidth: { type: String, default: undefined },
  },
  setup(props, ctx: SetupContext) {
    return () => {
      const { style, ...attrs } = ctx.attrs;
      return h(
        "div",
        {
          ...attrs,
          style: [
            style as CSSProperties,
            {
              "--bs-grid-columns": String(props.columns),
              "--bs-grid-gap": gapVars[props.gap] ?? gapVars.md,
              ...(props.minChildWidth != null
                ? { "--bs-grid-min-child-width": props.minChildWidth }
                : {}),
            },
          ],
          "data-scope": "grid",
          "data-part": "root",
          "data-autofill": props.minChildWidth != null ? "" : undefined,
        },
        ctx.slots.default?.(),
      );
    };
  },
});

injectComponentStyle("grid");
