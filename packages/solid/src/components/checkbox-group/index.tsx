import { Checkbox as ArkCheckbox } from "@ark-ui/solid/checkbox";
import { useFieldContext } from "@ark-ui/solid/field";
import { injectComponentStyle } from "@bysages/core";
import { For, splitProps } from "solid-js";
import type { JSX } from "solid-js";

export interface CheckboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

function checkGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="3"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12.5 5 5L19 7" />
    </svg>
  );
}

export interface CheckboxGroupProps extends JSX.HTMLAttributes<HTMLDivElement> {
  value?: string[];
  options: CheckboxOption[];
  layout?: "vertical" | "horizontal";
  invalid?: boolean;
  disabled?: boolean;
  onValueChange?: (value: string[]) => void;
}

/**
 * One question, many answers: a labelled stack (or row) of the seal-cut
 * checkboxes bound to a single array. Toggling a box adds or removes its
 * value; the group itself is semantics (`role="group"`), the boxes stay
 * the machine-driven originals. Inside a `Field.Root` the group picks up
 * the field context, so the invalid and disabled states a Form routes to
 * its name dress every box at once.
 */
export function CheckboxGroup(props: CheckboxGroupProps) {
  const field = useFieldContext();
  const [own, rest] = splitProps(props, [
    "value",
    "options",
    "layout",
    "invalid",
    "disabled",
    "onValueChange",
  ]);
  const selected = () => new Set(own.value ?? []);
  const isInvalid = () => own.invalid || field?.().invalid === true;
  const isDisabled = () => own.disabled || field?.().disabled === true;
  function toggle(value: string) {
    const next = new Set(selected());
    if (next.has(value)) next.delete(value);
    else next.add(value);
    own.onValueChange?.([...next]);
  }
  return (
    <div
      {...rest}
      role="group"
      data-scope="checkbox-group"
      data-part="root"
      data-layout={own.layout ?? "vertical"}
      data-invalid={isInvalid() ? "" : undefined}
    >
      <For each={own.options}>
        {(option) => (
          <ArkCheckbox.Root
            checked={selected().has(option.value)}
            invalid={isInvalid()}
            disabled={isDisabled() || option.disabled === true}
            onCheckedChange={() => toggle(option.value)}
          >
            <ArkCheckbox.Control>
              <ArkCheckbox.Indicator>{checkGlyph()}</ArkCheckbox.Indicator>
            </ArkCheckbox.Control>
            <ArkCheckbox.Label>{option.label}</ArkCheckbox.Label>
            <ArkCheckbox.HiddenInput />
          </ArkCheckbox.Root>
        )}
      </For>
    </div>
  );
}

// The options are the checkbox family's own seals — the group stylesheet
// only lays the row and column out around them.
injectComponentStyle("checkbox-group");
injectComponentStyle("checkbox");
