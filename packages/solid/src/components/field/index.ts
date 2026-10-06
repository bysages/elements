import { Field as ArkField } from "@ark-ui/solid/field";
import { injectComponentStyle } from "@bysages/core";
import { createComponent, mergeProps, type ComponentProps } from "solid-js";

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

export const Field: typeof FieldRoot & Omit<typeof ArkField, "Root"> & { Root: typeof FieldRoot } =
  defineFamily(FieldRoot, {
    ...ArkField,
    Root: FieldRoot,
  });
injectComponentStyle("field");
