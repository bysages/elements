import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { ColorPicker } from "./index";

/** An area, sliders and swatches for choosing a color. */
export default defineEntry({
  ColorPicker: {
    props: z.object({}),
    description: "An area, sliders and swatches for choosing a color.",
    component: () =>
      h(ColorPicker.Root as never, { defaultValue: "#1a5fb4" } as never, () => [
        h(ColorPicker.Label, () => "Pigment"),
        h(ColorPicker.Control, () => [
          h(ColorPicker.Trigger, () => h(ColorPicker.ValueSwatch as never)),
          h(ColorPicker.Positioner, () =>
            h(ColorPicker.Content, () =>
              h(ColorPicker.View, { view: "hsla" } as never, () => [
                h(ColorPicker.Area, () => [
                  h(ColorPicker.AreaBackground as never),
                  h(ColorPicker.AreaThumb as never),
                ]),
                h(ColorPicker.ChannelSlider, { channel: "hue" } as never, () => [
                  h(ColorPicker.ChannelSliderTrack as never),
                  h(ColorPicker.ChannelSliderThumb as never),
                ]),
                h(ColorPicker.ChannelSlider, { channel: "alpha" } as never, () => [
                  h(ColorPicker.ChannelSliderTrack as never),
                  h(ColorPicker.ChannelSliderThumb as never),
                ]),
              ]),
            ),
          ),
          h(ColorPicker.HiddenInput as never),
        ]),
      ]),
  },
});
