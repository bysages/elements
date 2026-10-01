import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { OrderList } from "./index";

/** Drag to reorder a list; the value is the ordered values. */
export default defineEntry({
  OrderList: {
    props: z.object({ options: z.array(z.string()).optional() }),
    description: "Drag to reorder a list; the value is the ordered values.",
    component: ({ props }) =>
      h(
        OrderList as never,
        {
          modelValue: props.options ?? ["Ink", "Paper", "Seal", "Press"],
        } as never,
      ),
  },
});
