import { Slider as ArkSlider } from "@ark-ui/solid/slider";
import type { SliderRootProps as ArkSliderRootProps } from "@ark-ui/solid/slider";
import { injectComponentStyle } from "@bysages/core/styling";
import { Show, splitProps } from "solid-js";

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

export interface SliderFacadeProps {
  value?: number;
  defaultValue?: number;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  readOnly?: boolean;
  orientation?: "horizontal" | "vertical";
  /** One rung of the part-size ladder for the thumb seal. */
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: number) => void;
}

/** The common single-value slider; ranges and markers stay on the anatomy. */
function SliderFacade(props: SliderFacadeProps) {
  injectComponentStyle("slider");

  return (
    <SliderRoot
      size={props.size ?? "md"}
      disabled={props.disabled}
      invalid={props.invalid}
      readOnly={props.readOnly}
      min={props.min ?? 0}
      max={props.max ?? 100}
      step={props.step ?? 1}
      orientation={props.orientation ?? "horizontal"}
      defaultValue={[props.defaultValue ?? 50]}
      {...(props.value === undefined ? {} : { value: [props.value] })}
      onValueChange={(details: { value: number[] }) =>
        props.onValueChange?.(details.value.at(0) ?? props.min ?? 0)
      }
    >
      <Show when={props.label}>
        <ArkSlider.Label>{props.label}</ArkSlider.Label>
      </Show>
      <ArkSlider.ValueText />
      <ArkSlider.Control>
        <ArkSlider.Track>
          <ArkSlider.Range />
        </ArkSlider.Track>
        <ArkSlider.Thumb index={0}>
          <ArkSlider.HiddenInput required={props.required} />
        </ArkSlider.Thumb>
      </ArkSlider.Control>
    </SliderRoot>
  );
}

type SliderParts = Omit<typeof ArkSlider, "Root"> & { Root: typeof SliderRoot };

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Slider: typeof SliderFacade & SliderParts = defineFamily(SliderFacade, {
  ...ArkSlider,
  Root: SliderRoot,
});

injectComponentStyle("slider");
