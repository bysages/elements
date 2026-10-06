import { Field as ArkField } from "@ark-ui/svelte/field";

import { defineFamily } from "../../internal/family";
import FieldFacade from "./Field.svelte";
import FieldRoot from "./FieldRoot.svelte";

/** Ark's Field, dressed in the paper-and-ink system: a tracked label, a
 * border-and-halo control, and quiet help text. The API is Ark's own —
 * Root, Label, Input, Textarea, Select, HelperText, ErrorText,
 * RequiredIndicator. */
export const Field: typeof FieldFacade &
  Omit<typeof ArkField, "Root"> & {
    Root: typeof FieldRoot;
  } = defineFamily(FieldFacade, {
  ...ArkField,
  Root: FieldRoot,
});
