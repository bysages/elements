import { h } from "vue";

import { faces } from "../../generative/faces";
import { labelled } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Slider } from "./index";

/** A ruled track the hand slides between bounds. */
export default defineEntry({
  Slider: {
    ...faces.Slider,
    component: ({ props }) =>
      labelled(
        props.label,
        h(
          Slider.Root as never,
          {
            defaultValue: [props.value ?? 50],
            min: props.min,
            max: props.max,
            step: props.step,
          } as never,
          () => [
            h(Slider.Control, () => [
              h(Slider.Track, () => h(Slider.Range)),
              h(Slider.Thumb, { index: 0 }, () => [h(Slider.HiddenInput as never)]),
            ]),
          ],
        ),
      ),
  },
});
