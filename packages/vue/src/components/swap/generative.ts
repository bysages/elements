import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Swap } from "./index";

/** Two faces that cross-fade on a state. */
export default defineEntry({
  Swap: {
    props: z.object({}),
    slots: ["default"],
    description: "Two faces that cross-fade on a state.",
    component: ({ children }) => {
      const kids = slotted(children);
      return h(Swap.Root as never, { defaultChecked: true } as never, () =>
        h(Swap.Indicator, null, {
          default: () => (kids[0] != null ? [kids[0]] : ["On"]),
          fallback: () => (kids[1] != null ? [kids[1]] : ["Off"]),
        }),
      );
    },
  },
});
