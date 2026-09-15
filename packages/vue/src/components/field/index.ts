import { Field as ArkField } from "@ark-ui/vue/field";
import { injectComponentStyle } from "@bysages/core";

/** Field, dressed in the paper-and-ink system: a tracked label, a
 * border-and-halo control, and quiet help text. The parts —
 * Root, Label, Input, Textarea, Select, HelperText, ErrorText,
 * RequiredIndicator. */
export const Field = ArkField;

injectComponentStyle("field");
