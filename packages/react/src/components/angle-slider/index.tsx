import { AngleSlider as ArkAngleSlider } from "@ark-ui/react/angle-slider";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

type AngleSliderRootProps = ComponentProps<typeof ArkAngleSlider.Root> & {
  /** One rung of the dial ladder — the diameter the needle sweeps. */
  size?: "sm" | "md" | "lg";
};

function AngleSliderRoot({ size = "md", ...rest }: AngleSliderRootProps) {
  return <ArkAngleSlider.Root {...rest} data-size={size} />;
}

/** Ark's AngleSlider, dressed in the paper-and-ink system: a flat paper dial
 * the thumb sweeps as a pigment needle over hairline degree ticks. The API
 * is Ark's own — Root, Label, ValueText, Control, Thumb, MarkerGroup,
 * Marker, HiddenInput. */
/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const AngleSlider: Omit<typeof ArkAngleSlider, "Root"> & {
  Root: typeof AngleSliderRoot;
} = {
  ...ArkAngleSlider,
  Root: AngleSliderRoot,
};

injectComponentStyle("angle-slider");
