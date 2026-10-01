import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Tooltip } from "./index";

/** One line of explanation on hover. */
export default defineEntry({
  Tooltip: {
    props: z.object({ content: z.string() }),
    description: "One line of explanation on hover.",
    component: ({ props }) =>
      h(Tooltip.Root, () => [
        h(Tooltip.Trigger, () => "Hover me"),
        h(Tooltip.Positioner, () => h(Tooltip.Content, () => props.content)),
      ]),
  },
});
