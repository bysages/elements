import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";

/** A list-collection context for composite widgets. */
export default defineEntry({
  Collection: {
    props: z.object({}),
    slots: ["default"],
    description: "A list-collection context for composite widgets.",
    component: ({ children }) => h("div", { "data-scope": "collection" }, slotted(children)),
  },
});
