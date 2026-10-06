import { AngleSlider as ArkAngleSlider } from "@ark-ui/react/angle-slider";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

import { useElementId } from "../../internal/id";

type AngleSliderRootProps = ComponentProps<typeof ArkAngleSlider.Root> & {
  /** One rung of the dial ladder — the diameter the needle sweeps. */
  size?: "sm" | "md" | "lg";
};

function AngleSliderRoot(props: AngleSliderRootProps) {
  const id = useElementId("angle-slider", props);
  const { size = "md", ...rest } = props;

  return <ArkAngleSlider.Root {...rest} id={id} data-size={size} />;
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
  className?: string;
  onValueChange?: (value: number) => void;
}

function AngleSliderFacade({
  value,
  defaultValue = 45,
  label,
  step = 1,
  disabled = false,
  readOnly = false,
  size = "md",
  className,
  onValueChange,
}: AngleSliderFacadeProps) {
  return (
    <AngleSliderRoot
      className={className}
      size={size}
      disabled={disabled}
      readOnly={readOnly}
      step={step}
      defaultValue={defaultValue}
      {...(value === undefined ? {} : { value })}
      onValueChange={(details: { value: number }) => onValueChange?.(details.value)}
    >
      {label ? <ArkAngleSlider.Label>{label}</ArkAngleSlider.Label> : null}
      <ArkAngleSlider.ValueText />
      <ArkAngleSlider.Control>
        <ArkAngleSlider.MarkerGroup>
          {[0, 90, 180, 270].map((degree) => (
            <ArkAngleSlider.Marker key={degree} value={degree} />
          ))}
        </ArkAngleSlider.MarkerGroup>
        <ArkAngleSlider.Thumb>
          <ArkAngleSlider.HiddenInput />
        </ArkAngleSlider.Thumb>
      </ArkAngleSlider.Control>
    </AngleSliderRoot>
  );
}

AngleSliderFacade.displayName = "SAngleSlider";

/** Ark's AngleSlider, dressed in the paper-and-ink system: a flat paper dial
 * the thumb sweeps as a pigment needle over hairline degree ticks. The API
 * is Ark's own — Root, Label, ValueText, Control, Thumb, MarkerGroup,
 * Marker, HiddenInput. */
type AngleSliderParts = Omit<typeof ArkAngleSlider, "Root"> & {
  Root: typeof AngleSliderRoot;
};

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const AngleSlider = Object.assign(AngleSliderFacade, {
  ...ArkAngleSlider,
  Root: AngleSliderRoot,
}) as typeof AngleSliderFacade & AngleSliderParts;

injectComponentStyle("angle-slider");
