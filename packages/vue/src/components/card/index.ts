import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { cloneVNode, defineComponent, h } from "vue";

function part(name: string, tag: string) {
  return defineComponent({
    name: "Card" + name,
    props: {
      /** Render the slot's element as the part — a link may wear the
       * vessel itself. */
      asChild: { type: Boolean, default: false },
    },
    setup(props, ctx: SetupContext) {
      const partProps = () => ({
        ...ctx.attrs,
        "data-scope": "card",
        "data-part": name.toLowerCase(),
      });
      if (props.asChild) {
        return () => {
          const child = ctx.slots.default?.()[0];
          return child ? cloneVNode(child, partProps()) : null;
        };
      }
      return () => h(tag, partProps(), ctx.slots.default?.());
    },
  });
}

const Root = part("Root", "section");
const Header = part("Header", "header");
const Title = part("Title", "h3");
const Description = part("Description", "p");
const Content = part("Content", "div");
const Footer = part("Footer", "footer");

/** A vessel: round, resting at the first elevation, one hairline for its
 * edge. Root, Header, Title, Description, Content, Footer — sections
 * carry their own whitespace, so any subset composes. */

export const Card = Object.assign(Root, { Root, Header, Title, Description, Content, Footer });

injectComponentStyle("card");
