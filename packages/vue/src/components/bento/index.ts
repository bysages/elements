import { injectComponentStyle } from "@bysages/core/styling";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

export interface BentoProps {
  /** Tracks across the lattice. */
  columns?: number;
}

/** The bento lattice: a grid of unequal tiles that reads as one plate.
 * The container owns the track count; each cell claims its own span. */
const BentoRoot = defineComponent({
  name: "SBentoRoot",
  props: {
    columns: { type: Number, default: 3 },
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("bento");

    return () =>
      h(
        "div",
        {
          ...ctx.attrs,
          "data-scope": "bento",
          "data-part": "root",
          style: { "--bs-bento-columns": String(props.columns) },
        },
        ctx.slots.default?.(),
      );
  },
});

/** One tile: `span` claims columns, `rowSpan` claims rows — the rest
 * of the plate stays in measure. */
const BentoCell = defineComponent({
  name: "SBentoCell",
  props: {
    span: { type: Number, default: 1 },
    rowSpan: { type: Number, default: 1 },
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("bento");

    return () =>
      h(
        "div",
        {
          ...ctx.attrs,
          "data-scope": "bento",
          "data-part": "cell",
          style: {
            "--bs-bento-span-x": String(props.span),
            "--bs-bento-span-y": String(props.rowSpan),
          },
        },
        ctx.slots.default?.(),
      );
  },
});

export const Bento = Object.assign(BentoRoot, { Root: BentoRoot, Cell: BentoCell });
