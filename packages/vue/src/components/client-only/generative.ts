import { ClientOnly } from "@ark-ui/vue/client-only";
import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";

/** Renders its children on the client only. */
export default defineEntry({
  ClientOnly: {
    props: z.object({}),
    slots: ["default"],
    description: "Renders its children on the client only.",
    component: ({ children }) =>
      h(ClientOnly as never, undefined, { default: () => slotted(children) }),
  },
});
