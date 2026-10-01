import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { List } from "./index";

/** A quiet ledger of rows; children are the rows. */
export default defineEntry({
  List: {
    props: z.object({ bordered: z.boolean().optional(), hoverable: z.boolean().optional() }),
    slots: ["default"],
    description: "A quiet ledger of rows; children are the rows.",
    component: ({ props, children }) =>
      h(List.Root, { bordered: props.bordered ?? false, hoverable: props.hoverable ?? false }, () =>
        slotted(children),
      ),
  },
});
