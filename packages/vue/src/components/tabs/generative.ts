import { h } from "vue";
import { z } from "zod";

import { slotted, slug } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Tabs } from "./index";

/** Tabbed sections; items name the tabs, children fill the first panel. */
export default defineEntry({
  Tabs: {
    props: z.object({
      items: z.array(z.string()).optional(),
      variant: z.enum(["line", "card"]).optional(),
      orientation: z.enum(["horizontal", "vertical"]).optional(),
    }),
    description: "Tabbed sections; items name the tabs, children fill the first panel.",
    component: ({ props, children }) => {
      const items = props.items ?? ["Account", "Billing", "Privacy"];
      const first = slug(items[0] ?? "");
      return h(
        Tabs.Root as never,
        { defaultValue: first, variant: props.variant, orientation: props.orientation },
        () => [
          h(Tabs.List, () => [
            ...items.map((item: string) =>
              h(Tabs.Trigger, { key: item, value: slug(item) }, () => item),
            ),
            h(Tabs.Indicator),
          ]),
          ...items.map((item: string, index: number) =>
            h(Tabs.Content, { key: item, value: slug(item) }, () =>
              index === 0 ? slotted(children) : [h("p", () => item + " panel.")],
            ),
          ),
        ],
      );
    },
  },
});
