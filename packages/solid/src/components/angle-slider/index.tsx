import { AngleSlider as ArkAngleSlider } from "@ark-ui/solid/angle-slider";
import type { AngleSliderRootProps as ArkAngleSliderRootProps } from "@ark-ui/solid/angle-slider";
import { injectComponentStyle } from "@bysages/core/styling";
import { splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's AngleSlider, dressed in the paper-and-ink system: a flat paper dial
 * the thumb sweeps as a pigment needle over hairline degree ticks. The API
 * is Ark's own — Root, Label, ValueText, Control, Thumb, MarkerGroup,
 * Marker, HiddenInput. */

type AngleSliderOwnProps = {
  /** One rung of the dial ladder — the diameter the needle sweeps. */
  size?: "sm" | "md" | "lg";
};

function AngleSliderRoot(props: ArkAngleSliderRootProps & AngleSliderOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("angle-slider", () => rest.id);
  return <ArkAngleSlider.Root {...rest} id={id()} data-size={own.size ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const AngleSlider: typeof AngleSliderRoot &
  Omit<typeof ArkAngleSlider, "Root"> & { Root: typeof AngleSliderRoot } = defineFamily(
  AngleSliderRoot,
  {
    ...ArkAngleSlider,
    Root: AngleSliderRoot,
  },
);

injectComponentStyle("angle-slider");
