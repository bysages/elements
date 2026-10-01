import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Terminal } from "./index";

/** A console pane; lines are the transcript, oldest first. */
export default defineEntry({
  Terminal: {
    props: z.object({ lines: z.array(z.string()).optional() }),
    description: "A console pane; lines are the transcript, oldest first.",
    component: ({ props }) =>
      h(
        Terminal as never,
        { lines: props.lines ?? ["Elements 0.3.0", "Type help to begin."] } as never,
      ),
  },
});
