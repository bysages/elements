import { Slider as ArkSlider } from "@ark-ui/react/slider";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps } from "react";

import { useElementId } from "../../internal/id";

type SliderRootProps = ComponentProps<typeof ArkSlider.Root> & {
  /** One rung of the part-size ladder for the thumb seal. */
  size?: "sm" | "md" | "lg";
};

function SliderRoot(props: SliderRootProps) {
  const id = useElementId("slider", props);
  const { size = "md", ...rest } = props;

  return <ArkSlider.Root {...rest} id={id} data-size={size} />;
}

export interface SliderFacadeProps {
  value?: number;
  defaultValue?: number;
  label?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  orientation?: "horizontal" | "vertical";
  /** One rung of the part-size ladder for the thumb seal. */
  size?: "sm" | "md" | "lg";
  className?: string;
  onValueChange?: (value: number) => void;
}

function SliderFacade({
  value,
  defaultValue = 50,
  label,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  orientation = "horizontal",
  size = "md",
  className,
  onValueChange,
}: SliderFacadeProps) {
  return (
    <SliderRoot
      className={className}
      size={size}
      disabled={disabled}
      min={min}
      max={max}
      step={step}
      orientation={orientation}
      defaultValue={[defaultValue]}
      {...(value === undefined ? {} : { value: [value] })}
      onValueChange={(details: { value: number[] }) => onValueChange?.(details.value.at(0) ?? min)}
    >
      {label ? <ArkSlider.Label>{label}</ArkSlider.Label> : null}
      <ArkSlider.ValueText />
      <ArkSlider.Control>
        <ArkSlider.Track>
          <ArkSlider.Range />
        </ArkSlider.Track>
        <ArkSlider.Thumb index={0}>
          <ArkSlider.HiddenInput />
        </ArkSlider.Thumb>
      </ArkSlider.Control>
    </SliderRoot>
  );
}

SliderFacade.displayName = "SSlider";

/** Ark's Slider, dressed in the paper-and-ink system: a recessed track the
 * primary ink runs along, a paper-seal thumb, and hairline tick markers.
 * The API is Ark's own — Root, Label, ValueText, Control, Track, Range,
 * Thumb, MarkerGroup, Marker, DraggingIndicator, HiddenInput. */
type SliderParts = Omit<typeof ArkSlider, "Root"> & { Root: typeof SliderRoot };

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Slider = Object.assign(SliderFacade, {
  ...ArkSlider,
  Root: SliderRoot,
}) as typeof SliderFacade & SliderParts;

injectComponentStyle("slider");
