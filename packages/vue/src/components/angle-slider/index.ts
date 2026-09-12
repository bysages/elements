import { AngleSlider as ArkAngleSlider } from "@ark-ui/vue/angle-slider";
import { injectComponentStyle } from "@bysages/core";

/** Ark's AngleSlider, dressed in the paper-and-ink system: a flat paper dial
 * the thumb sweeps as a pigment needle over hairline degree ticks. The API
 * is Ark's own — Root, Label, ValueText, Control, Thumb, MarkerGroup,
 * Marker, HiddenInput. */
export const AngleSlider = ArkAngleSlider;

injectComponentStyle("angle-slider");
