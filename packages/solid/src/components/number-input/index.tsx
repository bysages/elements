import { NumberInput as ArkNumberInput } from "@ark-ui/solid/number-input";
import type { NumberInputRootProps as ArkNumberInputRootProps } from "@ark-ui/solid/number-input";
import { injectComponentStyle } from "@bysages/core/styling";
import { Show, splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Ark's NumberInput, dressed in the paper-and-ink system: the stepper
 * rides inside the field as one seal split by a hairline, numbers set in
 * tabular figures. The API is Ark's own — Root, Label, Control, Input,
 * ValueText, IncrementTrigger, DecrementTrigger, Scrubber. */

type NumberInputOwnProps = {
  /** One rung of the control-height ladder for the field and its stepper. */
  size?: "sm" | "md" | "lg";
};

function NumberInputRoot(props: ArkNumberInputRootProps & NumberInputOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("number-input", () => rest.id);
  return <ArkNumberInput.Root {...rest} id={id()} data-size={own.size ?? "md"} />;
}

export interface NumberInputFacadeProps {
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
  /** One rung of the control-height ladder for the field and its stepper. */
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: string) => void;
}

/** The one-tag path for a stepped number field; formatting, scrubbing,
 * and locale rules stay on the anatomy. */
function NumberInputFacade(props: NumberInputFacadeProps) {
  injectComponentStyle("number-input");

  return (
    <NumberInputRoot
      size={props.size ?? "md"}
      min={props.min}
      max={props.max}
      step={props.step}
      disabled={props.disabled}
      invalid={props.invalid}
      required={props.required}
      defaultValue={props.defaultValue}
      {...(props.value === undefined ? {} : { value: props.value })}
      onValueChange={(details: { value: string }) => props.onValueChange?.(details.value)}
    >
      <Show when={props.label}>
        <ArkNumberInput.Label>{props.label}</ArkNumberInput.Label>
      </Show>
      <ArkNumberInput.Control>
        <ArkNumberInput.Input placeholder={props.placeholder} />
        <ArkNumberInput.Scrubber>{iconNode("pause")}</ArkNumberInput.Scrubber>
        <ArkNumberInput.IncrementTrigger aria-label="Increment">
          {iconNode("chevron-up")}
        </ArkNumberInput.IncrementTrigger>
        <ArkNumberInput.DecrementTrigger aria-label="Decrement">
          {iconNode("chevron-down")}
        </ArkNumberInput.DecrementTrigger>
      </ArkNumberInput.Control>
    </NumberInputRoot>
  );
}

type NumberInputParts = Omit<typeof ArkNumberInput, "Root"> & { Root: typeof NumberInputRoot };

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const NumberInput: typeof NumberInputFacade & NumberInputParts = defineFamily(
  NumberInputFacade,
  {
    ...ArkNumberInput,
    Root: NumberInputRoot,
  },
);

injectComponentStyle("number-input");
