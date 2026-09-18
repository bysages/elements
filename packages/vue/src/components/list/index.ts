import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

function part(name: string, tag: string) {
  return defineComponent({
    name: "List" + name,
    setup(_, ctx: SetupContext) {
      return () =>
        h(
          tag,
          { ...ctx.attrs, "data-scope": "list", "data-part": name.toLowerCase() },
          ctx.slots.default?.(),
        );
    },
  });
}

const Root = defineComponent({
  name: "ListRoot",
  props: {
    /** One hairline between rows. */
    bordered: { type: Boolean, default: false },
    /** Every row answers the pointer with a wash. */
    hoverable: { type: Boolean, default: false },
  },
  setup(props, ctx: SetupContext) {
    return () =>
      h(
        "ul",
        {
          ...ctx.attrs,
          "data-scope": "list",
          "data-part": "root",
          "data-bordered": props.bordered || undefined,
          "data-hoverable": props.hoverable || undefined,
        },
        ctx.slots.default?.(),
      );
  },
});

const Item = part("Item", "li");
const Leading = part("Leading", "div");
const Actions = part("Actions", "div");

/** The row's words: the title and description ride their own named
 * slots, the default slot follows them for anything else. */
const Content = defineComponent({
  name: "ListContent",
  setup(_, ctx: SetupContext) {
    return () =>
      h("div", { ...ctx.attrs, "data-scope": "list", "data-part": "content" }, () => [
        ctx.slots.title
          ? h("div", { "data-scope": "list", "data-part": "title" }, ctx.slots.title)
          : null,
        ctx.slots.description
          ? h("div", { "data-scope": "list", "data-part": "description" }, ctx.slots.description)
          : null,
        ...(ctx.slots.default?.() ?? []),
      ]);
  },
});

/** A ledger of rows: Root is the list, Item one row, Leading the mark
 * before the words, Content the title and its quiet echo, Actions the
 * way out. The bordered variant draws the hairlines; the hoverable
 * variant gives every row the wash — and any row the caller makes
 * clickable (role="button") answers the pointer on its own. */

export const List = Object.assign(Root, { Root, Item, Leading, Content, Actions });

injectComponentStyle("list");
