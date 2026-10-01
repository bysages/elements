import { Frame } from "@ark-ui/vue/frame";
import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";

/** An iframe viewport context. */
export default defineEntry({
  Frame: {
    props: z.object({}),
    slots: ["default"],
    description: "An iframe viewport context.",
    component: ({ children }) => h(Frame as never, () => slotted(children)),
  },
});
