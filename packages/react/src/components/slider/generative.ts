import { createElement } from "react";

import { faces } from "../../generative/faces.generated";
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
        createElement(Slider.Root, { defaultValue: [props.value ?? 50] }, [
          createElement(Slider.Control, null, [
            createElement(Slider.Track, null, createElement(Slider.Range)),
            createElement(Slider.Thumb, { index: 0, key: 0 }),
          ]),
        ]),
      ),
  },
});
