import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h, type PropType } from "vue";

import { withSelfRoot } from "../../internal/family";

const Root = defineComponent({
  name: "Descriptions",
  props: {
    layout: {
      type: String as PropType<"horizontal" | "vertical">,
      default: "horizontal",
    },
    /** The framed register: one hairline round the whole, terms on
     * inset paper. */
    bordered: { type: Boolean, default: false },
    /** Pairs across the grid: one ledger per column. */
    column: { type: Number, default: 1 },
    /** Simple records for the facade; a default slot overrides them. */
    items: { type: Array as PropType<DescriptionsItemData[]>, default: undefined },
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("descriptions");

    return () =>
      h(
        "dl",
        {
          ...ctx.attrs,
          "data-scope": "descriptions",
          "data-part": "root",
          "data-layout": props.layout,
          "data-bordered": props.bordered || undefined,
          style: { "--bs-desc-columns": String(props.column) },
        },
        ctx.slots.default?.() ??
          props.items?.map((item) =>
            h(Item, { key: item.term, span: item.span }, () => [
              h(Term, () => item.term),
              h(Detail, () => item.detail),
            ]),
          ),
      );
  },
});

function part(name: string, tag: string) {
  return defineComponent({
    name: "Descriptions" + name,
    setup(_, ctx: SetupContext) {
      return () =>
        h(
          tag,
          {
            ...ctx.attrs,
            "data-scope": "descriptions",
            "data-part": name.toLowerCase(),
          },
          ctx.slots.default?.(),
        );
    },
  });
}

const Item = defineComponent({
  name: "DescriptionsItem",
  props: {
    /** Column pairs this entry stretches across. */
    span: { type: Number, default: 1 },
  },
  setup(props, ctx: SetupContext) {
    return () =>
      h(
        "div",
        {
          ...ctx.attrs,
          style: {
            ...(ctx.attrs.style as object),
            "--bs-desc-span": String(props.span * 2),
          },
          "data-scope": "descriptions",
          "data-part": "item",
        },
        ctx.slots.default?.(),
      );
  },
});

const Term = part("Term", "dt");
const Detail = part("Detail", "dd");

/**
 * A ledger laid flat: term and detail pairs in one quiet grid. The
 * horizontal layout reads as a table of two columns; the vertical one
 * stacks each pair for narrow measures.
 */
export const Descriptions = Object.assign(withSelfRoot(Root), {
  Item,
  Term,
  Detail,
});

/** Simple term/detail records for the callable facade. */
export interface DescriptionsItemData {
  term: string;
  detail: string;
  span?: number;
}
