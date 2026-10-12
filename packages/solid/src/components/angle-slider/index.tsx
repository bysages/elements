import { AngleSlider as ArkAngleSlider } from "@ark-ui/solid/angle-slider";
import type { AngleSliderRootProps as ArkAngleSliderRootProps } from "@ark-ui/solid/angle-slider";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, Show, splitProps } from "solid-js";

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

export interface AngleSliderFacadeProps {
  value?: number;
  defaultValue?: number;
  label?: string;
  step?: number;
  disabled?: boolean;
  readOnly?: boolean;
  /** One rung of the dial ladder — the diameter the needle sweeps. */
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: number) => void;
}

/** The complete dial behind one angle and its cardinal degree marks. */
function AngleSliderFacade(props: AngleSliderFacadeProps) {
  injectComponentStyle("angle-slider");

  return (
    <AngleSliderRoot
      size={props.size ?? "md"}
      disabled={props.disabled}
      readOnly={props.readOnly}
      step={props.step ?? 1}
      defaultValue={props.defaultValue ?? 45}
      {...(props.value === undefined ? {} : { value: props.value })}
      onValueChange={(details: { value: number }) => props.onValueChange?.(details.value)}
    >
      <Show when={props.label}>
        <ArkAngleSlider.Label>{props.label}</ArkAngleSlider.Label>
      </Show>
      <ArkAngleSlider.ValueText />
      <ArkAngleSlider.Control>
        <ArkAngleSlider.MarkerGroup>
          <For each={[0, 90, 180, 270]}>{(degree) => <ArkAngleSlider.Marker value={degree} />}</For>
        </ArkAngleSlider.MarkerGroup>
        <ArkAngleSlider.Thumb>
          <ArkAngleSlider.HiddenInput />
        </ArkAngleSlider.Thumb>
      </ArkAngleSlider.Control>
    </AngleSliderRoot>
  );
}

type AngleSliderParts = Omit<typeof ArkAngleSlider, "Root"> & { Root: typeof AngleSliderRoot };

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const AngleSlider: typeof AngleSliderFacade & AngleSliderParts = defineFamily(
  AngleSliderFacade,
  {
    ...ArkAngleSlider,
    Root: AngleSliderRoot,
  },
);

injectComponentStyle("angle-slider");
