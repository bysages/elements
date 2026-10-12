import { Field as ArkField } from "@ark-ui/solid/field";
import { injectComponentStyle } from "@bysages/core/styling";
import { createComponent, mergeProps, Show, type ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's Field, dressed in the paper-and-ink system: a tracked label, a
 * border-and-halo control, and quiet help text. The API is Ark's own —
 * Root, Label, Input, Textarea, Select, HelperText, ErrorText,
 * RequiredIndicator. */
function FieldRoot(props: ComponentProps<typeof ArkField.Root>) {
  const id = useElementId("field", () => props.id);

  return createComponent(
    ArkField.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

/** The one-tag path for a simple text field; textarea, select, and
 * custom controls keep the anatomy. */
export interface FieldFacadeProps {
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

function FieldFacade(props: FieldFacadeProps) {
  injectComponentStyle("field");

  return (
    <FieldRoot disabled={props.disabled} invalid={props.invalid} required={props.required}>
      <Show when={props.label}>
        <ArkField.Label>{props.label}</ArkField.Label>
      </Show>
      <ArkField.Input
        placeholder={props.placeholder}
        value={props.value ?? props.defaultValue}
        onInput={(event) => props.onValueChange?.(event.currentTarget.value)}
      />
      <Show when={props.description}>
        <ArkField.HelperText>{props.description}</ArkField.HelperText>
      </Show>
    </FieldRoot>
  );
}

type FieldParts = Omit<typeof ArkField, "Root"> & { Root: typeof FieldRoot };

export const Field: typeof FieldFacade & FieldParts = defineFamily(FieldFacade, {
  ...ArkField,
  Root: FieldRoot,
});
injectComponentStyle("field");
