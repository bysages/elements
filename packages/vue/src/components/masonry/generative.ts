import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Masonry } from "./index";

/** A masonry wall: children fall into balanced columns. */
export default defineEntry({
  Masonry: {
    props: z.object({ columns: z.number().int().optional() }),
    slots: ["default"],
    description: "A masonry wall: children fall into balanced columns.",
    component: ({ props, children }) =>
      h(Masonry, { columns: props.columns ?? 3 }, () => slotted(children)),
  },
});
