import { AngleSlider as ArkAngleSlider } from "@ark-ui/vue/angle-slider";
import { injectComponentStyle } from "@bysages/core";

/** AngleSlider, dressed in the paper-and-ink system: a flat paper dial
 * the thumb sweeps as a pigment needle over hairline degree ticks. The parts — Root, Label, ValueText, Control, Thumb, MarkerGroup,
 * Marker, HiddenInput. */
export const AngleSlider = ArkAngleSlider;

injectComponentStyle("angle-slider");
