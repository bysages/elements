import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

/** A vessel: round, resting at the first elevation, one hairline for its
 * edge. Root, Header, Title, Description, Content, Footer — sections
 * carry their own whitespace, so any subset composes. */
function part(name: string, tag: string) {
  return defineComponent({
    name: "Card" + name,
    setup(_, ctx: SetupContext) {
      return () =>
        h(
          tag,
          { ...ctx.attrs, "data-scope": "card", "data-part": name.toLowerCase() },
          ctx.slots.default?.(),
        );
    },
  });
}

const Root = part("Root", "section");
const Header = part("Header", "header");
const Title = part("Title", "h3");
const Description = part("Description", "p");
const Content = part("Content", "div");
const Footer = part("Footer", "footer");

export const Card = Object.assign(Root, { Root, Header, Title, Description, Content, Footer });

injectComponentStyle("card");
