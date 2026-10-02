import { chevron_down } from "@bysages/icons";
import { h } from "vue";
import { z } from "zod";

import { slotted, slug } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { glyphNode } from "../../internal/glyph";
import { Accordion } from "./index";

/** A ruled sheet folded into rows; items name the rows, children fill the first. */
export default defineEntry({
  Accordion: {
    props: z.object({ items: z.array(z.string()).optional() }),
    slots: ["default"],
    description: "A ruled sheet folded into rows; items name the rows, children fill the first.",
    component: ({ props, children }) => {
      const items = props.items ?? ["What is Elements?", "How do tokens work?"];
      const chevron = () => glyphNode(chevron_down);
      const first = slug(items[0] ?? "");
      return h(Accordion.Root, { defaultValue: [first] }, () =>
        items.map((item: string, index: number) =>
          h(Accordion.Item, { key: item, value: slug(item) }, () => [
            h(Accordion.ItemTrigger, () => [item, h(Accordion.ItemIndicator, () => chevron)]),
            h(Accordion.ItemContent, () =>
              index === 0 ? slotted(children) : [h("p", () => item + " — details to follow.")],
            ),
          ]),
        ),
      );
    },
  },
});
