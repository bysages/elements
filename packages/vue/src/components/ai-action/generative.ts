import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Action } from "./index";

/** One offered AI action. */
export default defineEntry({
  AiAction: {
    props: z.object({ label: z.string().optional() }),
    description: "One offered AI action.",
    component: ({ props, emit }) =>
      h(Action as never, { label: props.label, onClick: () => emit("press") } as never),
  },
});
