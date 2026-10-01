import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { HoverCard } from "./index";

/** A preview card that opens on hover. */
export default defineEntry({
  HoverCard: {
    props: z.object({ content: z.string().optional() }),
    description: "A preview card that opens on hover.",
    component: ({ props }) =>
      h(HoverCard.Root, () => [
        h(HoverCard.Trigger, () => "@sages"),
        h(HoverCard.Positioner, () =>
          h(HoverCard.Content, () => [
            h(HoverCard.Arrow, () => h(HoverCard.ArrowTip)),
            props.content != null ? h("p", () => props.content!) : null,
          ]),
        ),
      ]),
  },
});
