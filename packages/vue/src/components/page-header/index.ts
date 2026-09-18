import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

function part(name: string, tag: string) {
  return defineComponent({
    name: "PageHeader" + name,
    setup(_, ctx: SetupContext) {
      return () =>
        h(
          tag,
          { ...ctx.attrs, "data-scope": "page-header", "data-part": name.toLowerCase() },
          ctx.slots.default?.(),
        );
    },
  });
}

const Root = part("Root", "header");
const Heading = part("Heading", "div");
const Eyebrow = part("Eyebrow", "p");
const Title = part("Title", "h1");
const Description = part("Description", "p");
const Actions = part("Actions", "div");

/** The page's face: an eyebrow whisper, a serif title, one line of
 * description, and the actions resting beside the title on the same
 * baseline. Heading groups title and actions; the rest compose below. */

export const PageHeader = Object.assign(Root, {
  Root,
  Heading,
  Eyebrow,
  Title,
  Description,
  Actions,
});

injectComponentStyle("page-header");
