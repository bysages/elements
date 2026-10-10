import { Field as ArkField } from "@ark-ui/react/field";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ChangeEvent, ComponentProps } from "react";

import { useElementId } from "../../internal/id";

/** Field, dressed in the paper-and-ink system: a tracked label, a
 * border-and-halo control, and quiet help text. The parts —
 * Root, Label, Input, Textarea, Select, HelperText, ErrorText,
 * RequiredIndicator. */
function FieldRoot(props: ComponentProps<typeof ArkField.Root>) {
  const id = useElementId("field", props);

  return <ArkField.Root {...props} id={id} />;
}

interface FieldFacadeProps {
  value?: string | number;
  defaultValue?: string | number;
  label?: string;
  description?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  onValueChange?: (value: string) => void;
}

/** The one-tag path for a simple text field; textarea, select, and
 * custom controls keep the anatomy. */
function FieldFacade({
  value,
  defaultValue,
  label,
  description,
  placeholder,
  disabled = false,
  invalid = false,
  required = false,
  onValueChange,
}: FieldFacadeProps) {
  return (
    <FieldRoot disabled={disabled} invalid={invalid} required={required}>
      {label ? <ArkField.Label>{label}</ArkField.Label> : null}
      <ArkField.Input
        placeholder={placeholder}
        defaultValue={defaultValue}
        {...(value === undefined
          ? {}
          : {
              value,
              onChange: (event: ChangeEvent<HTMLInputElement>) =>
                onValueChange?.(event.target.value),
            })}
      />
      {description ? <ArkField.HelperText>{description}</ArkField.HelperText> : null}
    </FieldRoot>
  );
}

export const Field = Object.assign(FieldFacade, {
  ...ArkField,
  Root: FieldRoot as unknown as typeof ArkField.Root,
});

injectComponentStyle("field");
