import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { Slider } from ".";
import { withState } from "../with-state.js";

const meta: Meta = { title: "Components/Forms/Slider" };
export default meta;

/** One slider anatomy: the labeled heading row, the recessed track with
 * its ink range, one thumb per value. */
function slider(rootProps: any, label: string, values: number[], markers?: number[]) {
  return h(Slider.Root, rootProps as any, () => [
    h(
      "div",
      { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline" } },
      () => [h(Slider.Label, () => label), h(Slider.ValueText)],
    ),
    h(Slider.Control, () => [
      h(Slider.Track, () => h(Slider.Range)),
      ...values.map((_, index) =>
        h(Slider.Thumb, { key: index, index }, () => [h(Slider.HiddenInput)]),
      ),
    ]),
    markers
      ? h(Slider.MarkerGroup, () =>
          markers.map((value) => h(Slider.Marker, { key: value, value }, () => String(value))),
        )
      : null,
  ]);
}

const row = { display: "grid", gap: "1.5rem", maxWidth: "20rem" };

/** One thumb, one track, the ink filling left of the seal. */
export const Basic = {
  args: {
    label: "Volume",
    min: 0,
    max: 100,
    step: 1,
    disabled: false,
  },
  render: (args: any) =>
    withState(
      () => () =>
        h("div", { style: row }, [
          slider(
            {
              defaultValue: [40],
              min: args.min,
              max: args.max,
              step: args.step,
              disabled: args.disabled,
            },
            args.label,
            [40],
          ),
        ]),
    ),
};

/** Two thumbs share the track: the ink runs between them. */
export const Range = {
  render: () => h("div", { style: row }, [slider({ defaultValue: [30, 60] }, "Band", [30, 60])]),
};

/** The track stands upright; the ink rises from the bottom. */
export const Vertical = {
  render: () =>
    h(
      "div",
      { style: { display: "flex", gap: "3rem", height: "10rem", alignItems: "flex-start" } },
      () => [
        h(Slider.Root, { orientation: "vertical" } as any, () => [
          h(Slider.Label, () => "Depth"),
          h(Slider.ValueText),
          h(Slider.Control, () => [
            h(Slider.Track, () => h(Slider.Range)),
            h(Slider.Thumb, { index: 0 }, () => h(Slider.HiddenInput)),
          ]),
        ]),
      ],
    ),
};

/** The origin sits mid-track: values below it ink leftward, above it
 * rightward. */
export const CenterOrigin = {
  render: () =>
    h("div", { style: row }, [slider({ origin: "center", defaultValue: [75] }, "Balance", [75])]),
};

/** The scale may run negative: -10 to 10, resting at 5. */
export const MinMax = {
  render: () =>
    h("div", { style: row }, [
      slider({ min: -10, max: 10, defaultValue: [5] }, "Temperature", [5]),
    ]),
};

/** Fine steps: 0.01 between 5 and 10, so the thumb travels in hundredths. */
export const Step = {
  render: () =>
    h("div", { style: row }, [
      slider({ step: 0.01, min: 5, max: 10, defaultValue: [7.5] }, "Precision", [7.5]),
    ]),
};

/** Tick markers ride under the track at every quarter. */
export const WithMarks = {
  render: () =>
    h("div", { style: row }, [
      slider({ defaultValue: [50] }, "Exposure", [50], [0, 25, 50, 75, 100]),
    ]),
};

/** Push: dragging one thumb into the other shoves it along. */
export const ThumbCollision = {
  render: () =>
    h("div", { style: row }, [
      slider({ thumbCollisionBehavior: "push", defaultValue: [25, 60] }, "Window", [25, 60]),
    ]),
};

/** Keep-apart: the thumbs hold five steps between them, no overlap. */
export const ThumbOverlap = {
  render: () =>
    h("div", { style: row }, [
      slider({ minStepsBetweenThumbs: 5, defaultValue: [25, 60] }, "Spaced", [25, 60]),
    ]),
};

/** The thumb centers over its value instead of trailing to the edge. */
export const ThumbAlignment = {
  render: () =>
    h("div", { style: row }, [
      slider({ thumbAlignment: "center", defaultValue: [50] }, "Centered", [50]),
    ]),
};

/** The value answers to the caller: the track only mirrors. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ value: [40] });
      return () =>
        h("div", { style: row }, [
          slider(
            {
              modelValue: state.value,
              onValueChange: (e: { value: number[] }) => (state.value = e.value),
            },
            "Controlled",
            state.value,
          ),
        ]);
    }),
};
