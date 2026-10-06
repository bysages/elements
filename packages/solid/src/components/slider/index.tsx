import { Slider as ArkSlider } from "@ark-ui/solid/slider";
import type { SliderRootProps as ArkSliderRootProps } from "@ark-ui/solid/slider";
import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's Slider, dressed in the paper-and-ink system: a recessed track the
 * primary ink runs along, a paper-seal thumb, and hairline tick markers.
 * The API is Ark's own — Root, Label, ValueText, Control, Track, Range,
 * Thumb, MarkerGroup, Marker, DraggingIndicator, HiddenInput. */

type SliderOwnProps = {
  /** One rung of the part-size ladder for the thumb seal. */
  size?: "sm" | "md" | "lg";
};

function SliderRoot(props: ArkSliderRootProps & SliderOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("slider", () => rest.id);
  return <ArkSlider.Root {...rest} id={id()} data-size={own.size ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Slider: typeof SliderRoot &
  Omit<typeof ArkSlider, "Root"> & { Root: typeof SliderRoot } = defineFamily(SliderRoot, {
  ...ArkSlider,
  Root: SliderRoot,
});

injectComponentStyle("slider");
