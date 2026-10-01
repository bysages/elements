import { FocusTrap } from "@ark-ui/vue/focus-trap";
import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";

/** Keeps focus cycling inside its children. */
export default defineEntry({
  FocusTrap: {
    props: z.object({}),
    slots: ["default"],
    description: "Keeps focus cycling inside its children.",
    component: ({ children }) => h(FocusTrap as never, () => slotted(children)),
  },
});
