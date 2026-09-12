import { Editable as ArkEditable } from "@ark-ui/svelte/editable";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Editable, dressed in the paper-and-ink system: bare ink while
 * reading, the full field recipe while editing. The API is Ark's own —
 * Root, Area, Label, Preview, Input, EditTrigger, SubmitTrigger,
 * CancelTrigger, Control. */
export const Editable = ArkEditable;

injectComponentStyle("editable");
