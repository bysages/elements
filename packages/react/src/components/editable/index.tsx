import { Editable as ArkEditable } from "@ark-ui/react/editable";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

/** Ark's Editable, dressed in the paper-and-ink system: bare ink while
 * reading, the full field recipe while editing. The API is Ark's own —
 * Root, Area, Label, Preview, Input, EditTrigger, SubmitTrigger,
 * CancelTrigger, Control. */
type EditableRootProps = ComponentProps<typeof ArkEditable.Root> & {
  /** One rung of the control-height ladder for the editing field. */
  size?: "sm" | "md" | "lg";
};

function EditableRoot({ size = "md", ...rest }: EditableRootProps) {
  return <ArkEditable.Root {...rest} data-size={size} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Editable: Omit<typeof ArkEditable, "Root"> & {
  Root: typeof EditableRoot;
} = {
  ...ArkEditable,
  Root: EditableRoot,
};

injectComponentStyle("editable");
