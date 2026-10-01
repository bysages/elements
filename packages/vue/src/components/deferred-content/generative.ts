import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { DeferredContent } from "./index";

/** Loads its children only when they come into view. */
export default defineEntry({
  DeferredContent: {
    props: z.object({}),
    slots: ["default"],
    description: "Loads its children only when they come into view.",
    component: ({ children }) => h(DeferredContent, () => slotted(children)),
  },
});
