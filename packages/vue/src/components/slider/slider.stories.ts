import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { Slider } from "./index.js";

const meta: Meta = { title: "Components / Slider" };
export default meta;

export const Basic = {
  render: () =>
    h(Slider.Root, { defaultValue: [40] }, () => [
      h(
        "div",
        { style: { display: "flex", justifyContent: "space-between", alignItems: "baseline" } },
        () => [h(Slider.Label, () => "Volume"), h(Slider.ValueText)],
      ),
      h(Slider.Control, () => [
        h(Slider.Track, () => h(Slider.Range)),
        h(Slider.Thumb, { index: 0 }, () => [h(Slider.DraggingIndicator), h(Slider.HiddenInput)]),
      ]),
      h(Slider.MarkerGroup, () => [
        h(Slider.Marker, { value: 0 }, () => "0"),
        h(Slider.Marker, { value: 50 }, () => "50"),
        h(Slider.Marker, { value: 100 }, () => "100"),
      ]),
    ]),
};
