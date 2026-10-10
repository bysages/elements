import { injectComponentStyle } from "@bysages/core/styling";
import type { SetupContext } from "vue";
import { defineComponent, h, type PropType } from "vue";

/** The thread's direction: a vertical line of moments, or one running
 * left to right. */
const Root = defineComponent({
  name: "TimelineRoot",
  inheritAttrs: false,
  props: {
    orientation: { type: String as PropType<"vertical" | "horizontal">, default: "vertical" },
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("timeline");

    return () =>
      h(
        "ol",
        {
          ...ctx.attrs,
          "data-scope": "timeline",
          "data-part": "root",
          "data-orientation": props.orientation,
        },
        ctx.slots.default?.(),
      );
  },
});

function part(name: string, tag: string) {
  return defineComponent({
    name: "Timeline" + name,
    inheritAttrs: false,
    setup(_, ctx: SetupContext) {
      injectComponentStyle("timeline");

      return () =>
        h(
          tag,
          { ...ctx.attrs, "data-scope": "timeline", "data-part": name.toLowerCase() },
          ctx.slots.default?.(),
        );
    },
  });
}

const Item = part("Item", "li");
const Marker = part("Marker", "span");
const Content = part("Content", "div");

/** A line of moments: Root is the ordered thread, Item one moment on it,
 * Marker the point where the thread passes, Content what the moment
 * holds. The hairline between markers is drawn by the stylesheet. */
export const Timeline = Object.assign(Root, { Root, Item, Marker, Content });
