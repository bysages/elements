import { Checkbox as ArkCheckbox } from "@ark-ui/solid/checkbox";
import { useFieldContext } from "@ark-ui/solid/field";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { Checkbox } from "../checkbox";

export interface CheckboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

function checkIcon() {
  return iconNode("check");
}

export interface CheckboxGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
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

function CheckboxGroupImpl(props: CheckboxGroupProps) {
  injectComponentStyle("checkbox-group");
  injectComponentStyle("checkbox");
  const field = useFieldContext();
  const [own, rest] = splitProps(props, [
    "id",
    "value",
    "defaultValue",
    "options",
    "layout",
    "size",
    "invalid",
    "disabled",
    "onValueChange",
  ]);
  const id = useElementId("checkbox-group", () => own.id);
  const selectedValue = own.value === undefined ? undefined : () => own.value as string[];
  const isInvalid = () => own.invalid || field?.().invalid === true;
  const isDisabled = () => own.disabled || field?.().disabled === true;

  return (
    <ArkCheckbox.Group
      {...rest}
      id={id()}
      {...(selectedValue === undefined ? {} : { value: selectedValue })}
      {...(own.defaultValue === undefined ? {} : { defaultValue: own.defaultValue })}
      disabled={isDisabled()}
      invalid={isInvalid()}
      onValueChange={own.onValueChange}
      data-layout={own.layout ?? "vertical"}
      data-invalid={isInvalid() ? "" : undefined}
    >
      <For each={own.options}>
        {(option) => (
          <ArkCheckbox.Root
            value={option.value}
            ids={{
              label: `${id()}:${option.value}:label`,
              hiddenInput: `${id()}:${option.value}:input`,
            }}
            data-size={own.size ?? "md"}
            disabled={option.disabled === true}
          >
            <ArkCheckbox.Control>
              <ArkCheckbox.Indicator>{checkIcon()}</ArkCheckbox.Indicator>
            </ArkCheckbox.Control>
            <ArkCheckbox.Label>{option.label}</ArkCheckbox.Label>
            <ArkCheckbox.HiddenInput />
          </ArkCheckbox.Root>
        )}
      </For>
    </ArkCheckbox.Group>
  );
}

export const CheckboxGroup = defineFamily(CheckboxGroupImpl, Checkbox) as typeof CheckboxGroupImpl &
  typeof Checkbox;
