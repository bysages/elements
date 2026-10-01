import { h } from "vue";
import { z } from "zod";

import { labelled } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Slider } from "./index";

/** A ruled track the hand slides between bounds. */
export default defineEntry({
  Slider: {
    props: z.object({ label: z.string().optional(), value: z.number().optional() }),
    description: "A ruled track the hand slides between bounds.",
    component: ({ props }) =>
      labelled(
        props.label,
        h(Slider.Root as never, { defaultValue: [props.value ?? 50] } as never, () => [
          h(Slider.Control, () => [
            h(Slider.Track, () => h(Slider.Range)),
            h(Slider.Thumb, { index: 0 }, () => [h(Slider.HiddenInput as never)]),
          ]),
        ]),
      ),
  },
});
