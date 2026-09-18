import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h, type PropType } from "vue";

const Root = defineComponent({
  name: "Descriptions",
  props: {
    layout: { type: String as PropType<"horizontal" | "vertical">, default: "horizontal" },
  },
  setup(props, ctx: SetupContext) {
    return () =>
      h(
        "dl",
        {
          ...ctx.attrs,
          "data-scope": "descriptions",
          "data-part": "root",
          "data-layout": props.layout,
        },
        ctx.slots.default?.(),
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
          { ...ctx.attrs, "data-scope": "descriptions", "data-part": name.toLowerCase() },
          ctx.slots.default?.(),
        );
    },
  });
}

const Item = part("Item", "div");
const Term = part("Term", "dt");
const Detail = part("Detail", "dd");

/**
 * A ledger laid flat: term and detail pairs in one quiet grid. The
 * horizontal layout reads as a table of two columns; the vertical one
 * stacks each pair for narrow measures.
 */

export const Descriptions = { Root, Item, Term, Detail };

injectComponentStyle("descriptions");
