import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Watermark } from "./index";

/** A faint repeated seal across its children. */
export default defineEntry({
  Watermark: {
    props: z.object({ content: z.string().optional() }),
    slots: ["default"],
    description: "A faint repeated seal across its children.",
    component: ({ props, children }) =>
      h(Watermark, { content: props.content ?? "Elements" }, () => slotted(children)),
  },
});
