import { Slider as ArkSlider } from "@ark-ui/solid/slider";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Slider, dressed in the paper-and-ink system: a recessed track the
 * primary ink runs along, a paper-seal thumb, and hairline tick markers.
 * The API is Ark's own — Root, Label, ValueText, Control, Track, Range,
 * Thumb, MarkerGroup, Marker, DraggingIndicator, HiddenInput. */
export const Slider = ArkSlider;

injectComponentStyle("slider");
