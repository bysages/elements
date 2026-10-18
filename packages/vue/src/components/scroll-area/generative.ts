import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { ScrollArea } from "./index";

/** A region with a quiet custom scrollbar. */
export default defineEntry({
  ScrollArea: {
    props: z.object({}),
    slots: ["default"],
    description: "A region with a quiet custom scrollbar.",
    component: ({ children }) => h(ScrollArea, {}, () => slotted(children)),
  },
});
