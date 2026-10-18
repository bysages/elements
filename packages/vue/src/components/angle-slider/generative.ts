import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { AngleSlider } from "./index";

/** A dial the hand turns through 360 degrees. */
export default defineEntry({
  AngleSlider: {
    props: z.object({ label: z.string().optional(), value: z.number().optional() }),
    description: "A dial the hand turns through 360 degrees.",
    component: ({ props }) =>
      h(AngleSlider, { label: props.label, defaultValue: props.value ?? 45 }),
  },
});
