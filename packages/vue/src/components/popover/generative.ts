import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Popover } from "./index";

/** A small anchored panel with richer content than a tooltip. */
export default defineEntry({
  Popover: {
    props: z.object({ content: z.string().optional() }),
    description: "A small anchored panel with richer content than a tooltip.",
    component: ({ props }) =>
      h(Popover.Root, { defaultOpen: true }, () => [
        h(Popover.Trigger, () => "Details"),
        h(Popover.Positioner, () =>
          h(Popover.Content, () => [
            h(Popover.CloseTrigger, () => "x"),
            props.content != null ? h(Popover.Description, () => props.content!) : null,
            h(Popover.Arrow, () => h(Popover.ArrowTip)),
          ]),
        ),
      ]),
  },
});
