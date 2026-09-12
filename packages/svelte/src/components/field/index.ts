import { Field as ArkField } from "@ark-ui/svelte/field";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Field, dressed in the paper-and-ink system: a tracked label, a
 * border-and-halo control, and quiet help text. The API is Ark's own —
 * Root, Label, Input, Textarea, Select, HelperText, ErrorText,
 * RequiredIndicator. */
export const Field = ArkField;

injectComponentStyle("field");
