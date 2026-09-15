import { Editable as ArkEditable } from "@ark-ui/vue/editable";
import { injectComponentStyle } from "@bysages/core";

/** Editable, dressed in the paper-and-ink system: bare ink while
 * reading, the full field recipe while editing. The parts —
 * Root, Area, Label, Preview, Input, EditTrigger, SubmitTrigger,
 * CancelTrigger, Control. */
export const Editable = ArkEditable;

injectComponentStyle("editable");
