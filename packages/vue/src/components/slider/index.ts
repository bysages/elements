import { Slider as ArkSlider } from "@ark-ui/vue/slider";
import { injectComponentStyle } from "@bysages/core";

/** Slider, dressed in the paper-and-ink system: a recessed track the
 * primary ink runs along, a paper-seal thumb, and hairline tick markers.
 * The parts — Root, Label, ValueText, Control, Track, Range,
 * Thumb, MarkerGroup, Marker, DraggingIndicator, HiddenInput. */
export const Slider = ArkSlider;

injectComponentStyle("slider");
