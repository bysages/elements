import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Carousel } from "./index";

/** A sliding gallery with arrows and dots. */
export default defineEntry({
  Carousel: {
    props: z.object({ slides: z.array(z.string()).optional() }),
    description: "A sliding gallery with arrows and dots.",
    component: ({ props }) =>
      h(Carousel, {
        items: (props.slides ?? ["First", "Second", "Third"]).map((label: string) => ({ label })),
      }),
  },
});
