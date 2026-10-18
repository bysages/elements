import { createComponent } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { Slider } from "./index";

/** A ruled track the hand slides between bounds. */
export default defineEntry({
  Slider: {
    ...faces.Slider,
    component: ({ props }) =>
      createComponent(Slider, {
        get label() {
          return props.label;
        },
        get defaultValue() {
          return props.value ?? 50;
        },
        get min() {
          return props.min;
        },
        get max() {
          return props.max;
        },
        get step() {
          return props.step;
        },
      }),
  },
});
