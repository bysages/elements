import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { BackTop } from "./index";

/** A floating control that returns the page to its top. */
export default defineEntry({
  BackTop: {
    props: z.object({ threshold: z.number().optional() }),
    description: "A floating control that returns the page to its top.",
    component: ({ props }) => h(BackTop as never, { threshold: props.threshold } as never),
  },
});
