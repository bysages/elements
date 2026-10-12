import { Editable as ArkEditable } from "@ark-ui/solid/editable";
import type { EditableRootProps as ArkEditableRootProps } from "@ark-ui/solid/editable";
import { injectComponentStyle } from "@bysages/core/styling";
import { Show, splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
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

export interface EditableFacadeProps {
  value?: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** One rung of the control-height ladder for the editing field. */
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: string) => void;
}

/** The one-tag path: a named value with the house edit controls. Modes,
 * custom triggers, and alternate editors stay on the anatomy. */
function EditableFacade(props: EditableFacadeProps) {
  injectComponentStyle("editable");

  return (
    <EditableRoot
      size={props.size ?? "md"}
      disabled={props.disabled}
      invalid={props.invalid}
      required={props.required}
      placeholder={props.placeholder}
      defaultValue={props.defaultValue}
      {...(props.value === undefined ? {} : { value: props.value })}
      onValueChange={(details: { value: string }) => props.onValueChange?.(details.value)}
    >
      <Show when={props.label}>
        <ArkEditable.Label>{props.label}</ArkEditable.Label>
      </Show>
      <ArkEditable.Area>
        <ArkEditable.Preview />
        <ArkEditable.Input />
      </ArkEditable.Area>
      <ArkEditable.Control>
        <ArkEditable.EditTrigger aria-label="Edit">
          {iconNode("pencil", { width: 14, height: 14 })}
        </ArkEditable.EditTrigger>
        <ArkEditable.SubmitTrigger aria-label="Submit">
          {iconNode("check", { width: 14, height: 14 })}
        </ArkEditable.SubmitTrigger>
        <ArkEditable.CancelTrigger aria-label="Cancel">
          {iconNode("x", { width: 14, height: 14 })}
        </ArkEditable.CancelTrigger>
      </ArkEditable.Control>
    </EditableRoot>
  );
}

type EditableParts = Omit<typeof ArkEditable, "Root"> & { Root: typeof EditableRoot };

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Editable: typeof EditableFacade & EditableParts = defineFamily(EditableFacade, {
  ...ArkEditable,
  Root: EditableRoot,
});

injectComponentStyle("editable");
