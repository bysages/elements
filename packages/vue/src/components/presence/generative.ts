import { Presence } from "@ark-ui/vue/presence";
import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";

/** Keeps children mounted until their exit animation ends. */
export default defineEntry({
  Presence: {
    props: z.object({}),
    slots: ["default"],
    description: "Keeps children mounted until their exit animation ends.",
    component: ({ children }) =>
      h(Presence as never, { present: true } as never, () => slotted(children)),
  },
});
