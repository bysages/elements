import { Editable as ArkEditable } from "@ark-ui/solid/editable";
import type { EditableRootProps as ArkEditableRootProps } from "@ark-ui/solid/editable";
import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's Editable, dressed in the paper-and-ink system: bare ink while
 * reading, the full field recipe while editing. The API is Ark's own —
 * Root, Area, Label, Preview, Input, EditTrigger, SubmitTrigger,
 * CancelTrigger, Control. */

type EditableOwnProps = {
  /** One rung of the control-height ladder for the editing field. */
  size?: "sm" | "md" | "lg";
};

function EditableRoot(props: ArkEditableRootProps & EditableOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("editable", () => rest.id);
  return <ArkEditable.Root {...rest} id={id()} data-size={own.size ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Editable: typeof EditableRoot &
  Omit<typeof ArkEditable, "Root"> & { Root: typeof EditableRoot } = defineFamily(EditableRoot, {
  ...ArkEditable,
  Root: EditableRoot,
});

injectComponentStyle("editable");
