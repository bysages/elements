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
      const labels = props.items ?? ["Account", "Billing", "Privacy"];
      const items = labels.map((label: string) => ({ value: slug(label), label }));
      return h(
        Tabs,
        {
          items,
          variant: props.variant,
          orientation: props.orientation,
        },
        {
          default: ({ item }: { item: (typeof items)[number] }) => {
            const index = items.findIndex((entry: { value: string }) => entry.value === item.value);
            return index === 0 ? slotted(children) : [h("p", () => item.label + " panel.")];
          },
        },
      );
    },
  },
});
