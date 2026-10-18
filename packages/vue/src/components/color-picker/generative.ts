import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { ColorPicker } from "./index";

/** A pigment field with area, channels and saved swatches. */
export default defineEntry({
  ColorPicker: {
    props: z.object({ value: z.string().optional() }),
    description: "A pigment field with area, channels and saved swatches.",
    component: ({ props }) => h(ColorPicker, { defaultValue: props.value ?? "#1a5fb4" }),
  },
});
