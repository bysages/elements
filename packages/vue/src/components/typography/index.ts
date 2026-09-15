import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

/** The typographic voices, named so prose can ask for one: display and
 * heading ride the song-serif, the rest ride the hei. Nothing here is
 * decorative — hierarchy is size, weight, and space. */
function part(name: string, tag: string) {
  return defineComponent({
    name: "Typography" + name,
    setup(_, ctx: SetupContext) {
      return () =>
        h(
          tag,
          { ...ctx.attrs, "data-scope": "typography", "data-part": name.toLowerCase() },
          ctx.slots.default?.(),
        );
    },
  });
}

const Display = part("Display", "p");
const Heading = part("Heading", "p");
const Lead = part("Lead", "p");
const Body = part("Body", "p");
const Muted = part("Muted", "p");
const Label = part("Label", "p");

export const Typography = Object.assign(Display, {
  Display,
  Heading,
  Lead,
  Body,
  Muted,
  Label,
});

injectComponentStyle("typography");
