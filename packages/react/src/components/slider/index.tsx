import { Slider as ArkSlider } from "@ark-ui/react/slider";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

type SliderRootProps = ComponentProps<typeof ArkSlider.Root> & {
  /** One rung of the part-size ladder for the thumb seal. */
  size?: "sm" | "md" | "lg";
};

function SliderRoot({ size = "md", ...rest }: SliderRootProps) {
  return <ArkSlider.Root {...rest} data-size={size} />;
}

/** Ark's Slider, dressed in the paper-and-ink system: a recessed track the
 * primary ink runs along, a paper-seal thumb, and hairline tick markers.
 * The API is Ark's own — Root, Label, ValueText, Control, Track, Range,
 * Thumb, MarkerGroup, Marker, DraggingIndicator, HiddenInput. */
/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Slider: Omit<typeof ArkSlider, "Root"> & { Root: typeof SliderRoot } = {
  ...ArkSlider,
  Root: SliderRoot,
};

injectComponentStyle("slider");
