import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { AngleSlider } from "./index.js";

const meta: Meta = { title: "Components / AngleSlider" };
export default meta;

const starTick = (value: number) =>
  h(AngleSlider.Marker, { key: value, value }, () => String(value));

export const Basic = {
  render: () =>
    h(AngleSlider.Root, { defaultValue: 45 }, () => [
      h(
        "div",
        { style: { display: "flex", justifyContent: "space-between", inlineSize: "100%" } },
        () => [h(AngleSlider.Label, () => "Rotation"), h(AngleSlider.ValueText)],
      ),
      h(AngleSlider.Control, () => [
        h(AngleSlider.MarkerGroup, () => [0, 45, 90, 135, 180, 225, 270, 315].map(starTick)),
        h(AngleSlider.Thumb, () => h(AngleSlider.HiddenInput)),
      ]),
    ]),
};
