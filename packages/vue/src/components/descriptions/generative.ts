import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Descriptions } from "./index";

/** A label/value ledger; items pair each term with its detail. */
export default defineEntry({
  Descriptions: {
    props: z.object({
      items: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
      column: z.number().int().optional(),
    }),
    description: "A label/value ledger; items pair each term with its detail.",
    component: ({ props }) => {
      const items = props.items ?? [];
      return h(Descriptions.Root, { column: props.column ?? 1 }, () =>
        items.map((item: { label: string; value: string }) =>
          h(Descriptions.Item as never, { key: item.label }, () => [
            h(Descriptions.Term, () => item.label),
            h(Descriptions.Detail, () => item.value),
          ]),
        ),
      );
    },
  },
});
