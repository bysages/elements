import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

function part(name: string, tag: string) {
  return defineComponent({
    name: "Empty" + name,
    setup(_, ctx: SetupContext) {
      return () =>
        h(
          tag,
          { ...ctx.attrs, "data-scope": "empty", "data-part": name.toLowerCase() },
          ctx.slots.default?.(),
        );
    },
  });
}

const Root = part("Root", "div");
const Visual = part("Visual", "div");
const Title = part("Title", "h3");
const Description = part("Description", "p");
const Actions = part("Actions", "div");

/** An empty state: the page holds its breath. Root centers the column,
 * Visual carries the mark, Title and Description carry the ink, Actions
 * the way out. Any subset composes. */

export const Empty = Object.assign(Root, { Root, Visual, Title, Description, Actions });

injectComponentStyle("empty");
