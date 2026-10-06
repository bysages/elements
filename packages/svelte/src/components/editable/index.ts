/** Ark's Editable, dressed in the paper-and-ink system: bare ink while
 * reading, the full field recipe while editing. The API is Ark's own —
 * Root, Area, Label, Preview, Input, EditTrigger, SubmitTrigger,
 * CancelTrigger, Control. */
import { Editable as ArkEditable } from "@ark-ui/svelte/editable";

import { defineFamily } from "../../internal/family";
import EditableFacade from "./Editable.svelte";
import EditableRoot from "./EditableRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Editable: typeof EditableFacade &
  Omit<typeof ArkEditable, "Root"> & {
    Root: typeof EditableRoot;
  } = defineFamily(EditableFacade, {
  ...ArkEditable,
  Root: EditableRoot,
});
