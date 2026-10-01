import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { ButtonGroup } from "./index";

/** Joins sibling buttons into one ruled cluster. */
export default defineEntry({
  ButtonGroup: {
    props: z.object({ size: z.enum(["sm", "md", "lg"]).optional() }),
    slots: ["default"],
    description: "Joins sibling buttons into one ruled cluster.",
    component: ({ props, children }) =>
      h(ButtonGroup.Root, { size: props.size ?? undefined }, () => slotted(children)),
  },
});
