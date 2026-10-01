import { h } from "vue";
import { z } from "zod";

import { stringsFor } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Listbox } from "./index";

/** A standing list of options to pick one from. */
export default defineEntry({
  Listbox: {
    props: z.object({ label: z.string().optional(), items: z.array(z.string()).optional() }),
    description: "A standing list of options to pick one from.",
    component: ({ props }) => {
      const collection = stringsFor(props.items);
      const mark = () =>
        h("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, [
          h("path", {
            d: "M4 8.5l2.5 2.5L12 5.5",
            stroke: "currentColor",
            "stroke-width": "1.5",
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
          }),
        ]);
      return h(Listbox.Root as never, { collection, selectionMode: "single" }, () => [
        h(Listbox.Label, () => props.label ?? undefined),
        h(Listbox.Content, () =>
          (props.items ?? []).map((item: string) =>
            h(Listbox.Item as never, { key: item, item: { label: item, value: item } }, () => [
              h(Listbox.ItemText, () => item),
              h(Listbox.ItemIndicator, () => mark()),
            ]),
          ),
        ),
      ]);
    },
  },
});
