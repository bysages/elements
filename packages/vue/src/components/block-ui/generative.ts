import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { BlockUI } from "./index";

/** A veil that blocks its children while work settles. */
export default defineEntry({
  BlockUI: {
    props: z.object({ blocked: z.boolean().optional() }),
    slots: ["default"],
    description: "A veil that blocks its children while work settles.",
    component: ({ props, children }) =>
      h(BlockUI as never, { blocked: props.blocked ?? false } as never, () => slotted(children)),
  },
});
