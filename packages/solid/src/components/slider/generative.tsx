import { createComponent, type JSX } from "solid-js";

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
        createComponent(Slider.Root, {
          get defaultValue() {
            return [props.value ?? 50];
          },
          get children() {
            return [
              createComponent(Slider.Control, {
                get children() {
                  return [
                    createComponent(Slider.Track, {
                      get children() {
                        return createComponent(Slider.Range, {});
                      },
                    }),
                    createComponent(Slider.Thumb, { index: 0 }),
                  ] as JSX.Element;
                },
              }),
            ] as JSX.Element;
          },
        }),
      ),
  },
});
