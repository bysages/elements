import { useAngleSlider } from "@ark-ui/vue/angle-slider";
import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { withState } from "../with-state.js";
import { AngleSlider } from "./index.js";

const meta: Meta = { title: "Components / Angle Slider" };
export default meta;

const MARKS = [0, 45, 90, 135, 180, 225, 270, 315];

function markGroup() {
  return h(AngleSlider.MarkerGroup, () =>
    MARKS.map((value) => h(AngleSlider.Marker, { key: value, value })),
  );
}

function dial(label: string) {
  return [
    h(
      "div",
      { style: { display: "flex", justifyContent: "space-between", inlineSize: "100%" } },
      () => [h(AngleSlider.Label, () => label), h(AngleSlider.ValueText)],
    ),
    h(AngleSlider.Control, () => [
      markGroup(),
      h(AngleSlider.Thumb, () => h(AngleSlider.HiddenInput)),
    ]),
  ];
}

/** The dial: eight marks of the compass rose, the thumb dragged around the
 * circle. */
export const Basic = {
  render: () => h(AngleSlider.Root, { defaultValue: 45 }, () => dial("Rotation")),
};

/** The dial reads its own state: the label names the current bearing. */
export const Context = {
  render: () =>
    h(AngleSlider.Root, () => [
      h(AngleSlider.Context as any, null, {
        default: (ctx: { value: number }) => h(AngleSlider.Label, () => `${ctx.value} degrees`),
      }),
      h(AngleSlider.Control, () => [
        markGroup(),
        h(AngleSlider.Thumb, () => h(AngleSlider.HiddenInput)),
      ]),
      h(AngleSlider.ValueText),
    ]),
};

/** The bearing answers to the caller — the dial only mirrors it. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ value: 45 });
      return () =>
        h("div", { style: { display: "grid", gap: "0.75rem", justifyItems: "start" } }, [
          h(
            "output",
            {
              style: {
                fontSize: "var(--bs-font-size-sm)",
                color: "var(--bs-color-text-secondary)",
              },
            },
            () => `${state.value}°`,
          ),
          h(
            AngleSlider.Root,
            {
              modelValue: state.value,
              onValueChange: (e: { value: number }) => (state.value = e.value),
            } as any,
            () => dial("Rotation"),
          ),
        ]);
    }),
};

/** A dial retired from service: no drag, no keys. */
export const Disabled = {
  render: () => h(AngleSlider.Root, { disabled: true, defaultValue: 45 }, () => dial("Rotation")),
};

/** Fifteen degrees at a time: the thumb lands on every spoke. */
export const Step = {
  render: () => h(AngleSlider.Root, { step: 15 }, () => dial("15 Step")),
};

/** The machine answers outside its anatomy: the provider owns the dial. */
export const RootProvider = {
  render: () => {
    const Driver = {
      name: "AngleSliderRootProvider",
      setup() {
        const angleSlider = useAngleSlider({ defaultValue: 90 });
        return () =>
          h(AngleSlider.RootProvider as any, { value: angleSlider.value }, () => [
            ...dial("Rotation"),
          ]);
      },
    };
    return () => h(Driver);
  },
};
