/** Ark's Slider, dressed in the paper-and-ink system: a recessed track the
 * primary ink runs along, a paper-seal thumb, and hairline tick markers.
 * The API is Ark's own — Root, Label, ValueText, Control, Track, Range,
 * Thumb, MarkerGroup, Marker, DraggingIndicator, HiddenInput. */
import { Slider as ArkSlider } from "@ark-ui/svelte/slider";

import { defineFamily } from "../../internal/family";
import SliderFacade from "./Slider.svelte";
import SliderRoot from "./SliderRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Slider: typeof SliderFacade &
  Omit<typeof ArkSlider, "Root"> & {
    Root: typeof SliderRoot;
  } = defineFamily(SliderFacade, {
  ...ArkSlider,
  Root: SliderRoot,
});
