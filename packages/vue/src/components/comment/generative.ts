import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Comment } from "./index";

/** A conversational entry: seal, author, time, and the words. */
export default defineEntry({
  Comment: {
    props: z.object({ author: z.string().optional(), text: z.string().optional() }),
    slots: ["default"],
    description: "A conversational entry: seal, author, time, and the words.",
    component: ({ props, children }) =>
      h(Comment as never, { author: props.author, text: props.text } as never, () =>
        slotted(children),
      ),
  },
});
