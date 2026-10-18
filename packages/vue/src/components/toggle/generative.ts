import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Toggle } from "./index";

/** A button that stays pressed while its state holds. */
export default defineEntry({
  Toggle: {
    props: z.object({ label: z.string(), pressed: z.boolean().optional() }),
    slots: ["default"],
    description: "A button that stays pressed while its state holds.",
    component: ({ props, children, emit }) =>
      h(
        Toggle,
        {
          label: props.label,
          defaultPressed: props.pressed ?? false,
          onClick: () => emit("press"),
        },
        () => slotted(children),
      ),
  },
});
