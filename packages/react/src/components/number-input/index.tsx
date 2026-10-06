import { NumberInput as ArkNumberInput } from "@ark-ui/react/number-input";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

type NumberInputRootProps = ComponentProps<typeof ArkNumberInput.Root> & {
  /** One rung of the control-height ladder for the field and its stepper. */
  size?: "sm" | "md" | "lg";
};

function NumberInputRoot(props: NumberInputRootProps) {
  const id = useElementId("number-input", props);
  const { size = "md", ...rest } = props;

  return <ArkNumberInput.Root {...rest} id={id} data-size={size} />;
}

interface NumberInputFacadeProps {
  value?: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: string) => void;
}

/** The one-tag path for a stepped number field; formatting, scrubbing,
 * and locale rules stay on the anatomy. */
function NumberInputFacade({
  value,
  defaultValue,
  label,
  placeholder,
  min,
  max,
  step,
  disabled = false,
  invalid = false,
  required = false,
  size = "md",
  onValueChange,
}: NumberInputFacadeProps) {
  return (
    <NumberInputRoot
      size={size}
      min={min}
      max={max}
      step={step}
      disabled={disabled}
      invalid={invalid}
      required={required}
      defaultValue={defaultValue}
      {...(value === undefined
        ? {}
        : {
            value,
            onValueChange: (details: { value: string }) => onValueChange?.(details.value),
          })}
    >
      {label ? <ArkNumberInput.Label>{label}</ArkNumberInput.Label> : null}
      <ArkNumberInput.Control>
        <ArkNumberInput.Input placeholder={placeholder} />
        <ArkNumberInput.Scrubber>{iconNode("pause")}</ArkNumberInput.Scrubber>
        <ArkNumberInput.IncrementTrigger>{iconNode("chevron-up")}</ArkNumberInput.IncrementTrigger>
        <ArkNumberInput.DecrementTrigger>
          {iconNode("chevron-down")}
        </ArkNumberInput.DecrementTrigger>
      </ArkNumberInput.Control>
    </NumberInputRoot>
  );
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const NumberInput = Object.assign(NumberInputFacade, {
  ...ArkNumberInput,
  Root: NumberInputRoot,
});

injectComponentStyle("number-input");
