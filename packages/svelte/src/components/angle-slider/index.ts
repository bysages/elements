/** Ark's AngleSlider, dressed in the paper-and-ink system: a flat paper dial
 * the thumb sweeps as a pigment needle over hairline degree ticks. The API
 * is Ark's own — Root, Label, ValueText, Control, Thumb, MarkerGroup,
 * Marker, HiddenInput. */
import { AngleSlider as ArkAngleSlider } from "@ark-ui/svelte/angle-slider";

import AngleSliderRoot from "./AngleSliderRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const AngleSlider: Omit<typeof ArkAngleSlider, "Root"> & { Root: typeof AngleSliderRoot } = {
  ...ArkAngleSlider,
  Root: AngleSliderRoot,
};
