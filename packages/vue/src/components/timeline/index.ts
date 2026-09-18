import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

function part(name: string, tag: string) {
  return defineComponent({
    name: "Timeline" + name,
    setup(_, ctx: SetupContext) {
      return () =>
        h(
          tag,
          { ...ctx.attrs, "data-scope": "timeline", "data-part": name.toLowerCase() },
          ctx.slots.default?.(),
        );
    },
  });
}

const Root = part("Root", "ol");
const Item = part("Item", "li");
const Marker = part("Marker", "span");
const Content = part("Content", "div");

/** A line of moments: Root is the ordered thread, Item one moment on it,
 * Marker the point where the thread passes, Content what the moment
 * holds. The hairline between markers is drawn by the stylesheet. */
export const Timeline = Object.assign(Root, { Root, Item, Marker, Content });

injectComponentStyle("timeline");
