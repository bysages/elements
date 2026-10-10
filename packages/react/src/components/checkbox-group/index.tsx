import { Checkbox as ArkCheckbox } from "@ark-ui/react/checkbox";
import { useFieldContext } from "@ark-ui/react/field";
import { injectComponentStyle } from "@bysages/core/styling";
import type { HTMLAttributes } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { Checkbox } from "../checkbox";

export interface CheckboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

const checkIcon = iconNode("check");

export interface CheckboxGroupProps extends HTMLAttributes<HTMLDivElement> {
  value?: string[];
  defaultValue?: string[];
  options: CheckboxOption[];
  layout?: "vertical" | "horizontal";
  /** One register for every box: falls onto each root's data-size for
   * the stylesheet to retune. */
  size?: "sm" | "md" | "lg";
  invalid?: boolean;
  disabled?: boolean;
  onValueChange?: (value: string[]) => void;
}

/**
 * One question, many answers: a labelled stack (or row) of the seal-cut
 * checkboxes bound to a single array. Ark's group owns selection, form
 * wiring, and limits; the facade maps an options list onto it. Inside a
 * `Field.Root` the group picks up the field context, so invalid and
 * disabled states dress every box at once.
 */
function CheckboxGroupImpl({
  value,
  defaultValue,
  options,
  layout = "vertical",
  size = "md",
  invalid = false,
  disabled = false,
  onValueChange,
  ...rest
}: CheckboxGroupProps) {
  injectComponentStyle("checkbox-group");
  injectComponentStyle("checkbox");

  const field = useFieldContext();
  const uid = useElementId("checkbox-group", rest);
  const isInvalid = invalid || field?.invalid === true;
  const isDisabled = disabled || field?.disabled === true;

  return (
    <ArkCheckbox.Group
      asChild
      {...(isInvalid ? { invalid: true } : {})}
      {...(isDisabled ? { disabled: true } : {})}
      {...(defaultValue === undefined ? {} : { defaultValue })}
      {...(value === undefined ? {} : { value })}
      onValueChange={onValueChange}
    >
      <div
        {...rest}
        id={uid}
        data-scope="checkbox-group"
        data-part="root"
        data-layout={layout}
        data-invalid={isInvalid ? "" : undefined}
      >
        {options.map((option) => {
          const checkboxId = `${uid}:checkbox:${option.value}`;
          return (
            <ArkCheckbox.Root
              key={option.value}
              id={checkboxId}
              value={option.value}
              ids={{
                label: `${checkboxId}:label`,
                hiddenInput: `${checkboxId}:input`,
              }}
              data-size={size}
              disabled={isDisabled || option.disabled === true}
            >
              <ArkCheckbox.Control>
                <ArkCheckbox.Indicator>{checkIcon}</ArkCheckbox.Indicator>
              </ArkCheckbox.Control>
              <ArkCheckbox.Label>{option.label}</ArkCheckbox.Label>
              <ArkCheckbox.HiddenInput />
            </ArkCheckbox.Root>
          );
        })}
      </div>
    </ArkCheckbox.Group>
  );
}

export const CheckboxGroup = Object.assign(
  CheckboxGroupImpl,
  Checkbox,
) as typeof CheckboxGroupImpl & typeof Checkbox;

// The options are the checkbox family's own seals — the group stylesheet
// only lays the row and column out around them.
