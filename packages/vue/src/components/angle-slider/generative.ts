import { h } from "vue";
import { z } from "zod";

import { labelled } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { AngleSlider } from "./index";

/** A dial the hand turns through 360 degrees. */
export default defineEntry({
  AngleSlider: {
    props: z.object({ label: z.string().optional(), value: z.number().optional() }),
    description: "A dial the hand turns through 360 degrees.",
    component: ({ props }) =>
      labelled(
        props.label,
        h(AngleSlider.Root as never, { defaultValue: props.value ?? 45 } as never, () => [
          h(AngleSlider.Control, () => [
            h(AngleSlider.Thumb, () => [h(AngleSlider.HiddenInput as never)]),
          ]),
          h(AngleSlider.ValueText as never),
        ]),
      ),
  },
});
