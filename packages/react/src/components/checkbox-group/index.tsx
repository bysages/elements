import { Checkbox as ArkCheckbox } from "@ark-ui/react/checkbox";
import { useFieldContext } from "@ark-ui/react/field";
import { injectComponentStyle } from "@bysages/core";
import { useId, type HTMLAttributes } from "react";

export interface CheckboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

const checkGlyph = (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={3}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="m5 12.5 5 5L19 7" />
  </svg>
);

export interface CheckboxGroupProps extends HTMLAttributes<HTMLDivElement> {
  value?: string[];
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
 * checkboxes bound to a single array. Toggling a box adds or removes its
 * value; the group itself is semantics (`role="group"`), the boxes stay
 * the machine-driven originals. Inside a `Field.Root` the group picks up
 * the field context, so the invalid and disabled states a Form routes to
 * its name dress every box at once.
 */
export function CheckboxGroup({
  value = [],
  options,
  layout = "vertical",
  size = "md",
  invalid = false,
  disabled = false,
  onValueChange,
  ...rest
}: CheckboxGroupProps) {
  const field = useFieldContext();
  // A field context bends every box's hidden input onto the field's own
  // id, so labels of a multi-box group would all activate the first box —
  // each box claims its own ids instead.
  const uid = useId();
  const selected = new Set(value);
  const isInvalid = invalid || field?.invalid === true;
  const isDisabled = disabled || field?.disabled === true;
  function toggle(option: string) {
    const next = new Set(selected);
    if (next.has(option)) next.delete(option);
    else next.add(option);
    onValueChange?.([...next]);
  }
  return (
    <div
      {...rest}
      role="group"
      data-scope="checkbox-group"
      data-part="root"
      data-layout={layout}
      data-invalid={isInvalid ? "" : undefined}
    >
      {options.map((option) => (
        <ArkCheckbox.Root
          key={option.value}
          ids={{
            label: `${uid}:${option.value}:label`,
            hiddenInput: `${uid}:${option.value}:input`,
          }}
          data-size={size}
          checked={selected.has(option.value)}
          invalid={isInvalid}
          disabled={isDisabled || option.disabled === true}
          onCheckedChange={() => toggle(option.value)}
        >
          <ArkCheckbox.Control>
            <ArkCheckbox.Indicator>{checkGlyph}</ArkCheckbox.Indicator>
          </ArkCheckbox.Control>
          <ArkCheckbox.Label>{option.label}</ArkCheckbox.Label>
          <ArkCheckbox.HiddenInput />
        </ArkCheckbox.Root>
      ))}
    </div>
  );
}

// The options are the checkbox family's own seals — the group stylesheet
// only lays the row and column out around them.
injectComponentStyle("checkbox-group");
injectComponentStyle("checkbox");
