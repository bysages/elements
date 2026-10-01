import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Image } from "./index";

/** A photograph with its alt words. */
export default defineEntry({
  Image: {
    props: z.object({ src: z.string().optional(), alt: z.string().optional() }),
    slots: ["default"],
    description: "A photograph with its alt words.",
    component: ({ props, children }) =>
      h(Image as never, { src: props.src, alt: props.alt } as never, () => slotted(children)),
  },
});
