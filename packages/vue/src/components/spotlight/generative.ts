import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Spotlight } from "./index";

/** A vessel whose rim and face take light from the reader's hand. */
export default defineEntry({
  Spotlight: {
    props: z.object({ radius: z.string().optional() }),
    slots: ['    slots: ["default"],'],
    description: "A vessel whose rim and face take light from the reader's hand.",
    component: ({ props, children }) =>
      h(Spotlight, { radius: props.radius ?? undefined }, () => slotted(children)),
  },
});
