import { injectComponentStyle } from "@bysages/core";
import type { PropType, SetupContext } from "vue";
import { defineComponent, h } from "vue";

/** One place the ink came from; href and the rest ride the anchor. */
export const Source = defineComponent({
  name: "AiSource",
  props: {
    /** Where the ink came from — also the link text when no slot is
     * given; opens in a new tab, referrer-free. */
    href: { type: String, required: true },
  },
  setup(props, ctx: SetupContext) {
    return () =>
      h("li", { "data-scope": "ai", "data-part": "source" }, [
        h(
          "a",
          { ...ctx.attrs, href: props.href, target: "_blank", rel: "noreferrer" },
          ctx.slots.default?.() ?? props.href,
        ),
      ]);
  },
});

/** The reading list under a response: where this ink came from. */
export const Sources = defineComponent({
  name: "AiSources",
  setup(_, ctx: SetupContext) {
    return () =>
      h("ol", { ...ctx.attrs, "data-scope": "ai", "data-part": "sources" }, ctx.slots.default?.());
  },
});

injectComponentStyle("ai");

export { Source as AiSource, Sources as AiSources };
