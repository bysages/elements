import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Menu } from "./index";

/** A triggered list of actions; items name the rows. */
export default defineEntry({
  Menu: {
    props: z.object({ label: z.string().optional(), items: z.array(z.string()).optional() }),
    description: "A triggered list of actions; items name the rows.",
    component: ({ props }) => {
      const items = props.items ?? ["New file", "Save", "Export"];
      return h(Menu.Root, () => [
        h(Menu.Trigger, () => [h("span", () => props.label ?? "Actions"), h(Menu.Indicator)]),
        h(Menu.Positioner, () =>
          h(Menu.Content, () =>
            items.map((item: string) => h(Menu.Item, { key: item, value: item }, () => item)),
          ),
        ),
      ]);
    },
  },
});
