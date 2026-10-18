import { h } from "vue";

import { faces } from "../../generative/faces";
import { defineEntry } from "../../generative/shared";
import { Slider } from "./index";

/** A ruled track the hand slides between bounds. */
export default defineEntry({
  Slider: {
    ...faces.Slider,
    component: ({ props }) =>
      h(Slider, {
        label: props.label,
        defaultValue: props.value ?? 50,
        min: props.min,
        max: props.max,
        step: props.step,
      }),
  },
});
