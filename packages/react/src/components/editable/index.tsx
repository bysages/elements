import { Editable as ArkEditable } from "@ark-ui/react/editable";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps, ReactNode } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

type EditableRootProps = ComponentProps<typeof ArkEditable.Root> & {
  /** One rung of the control-height ladder for the editing field. */
  size?: "sm" | "md" | "lg";
};

function EditableRoot(props: EditableRootProps) {
  const id = useElementId("editable", props);
  const { size = "md", ...rest } = props;

  return <ArkEditable.Root {...rest} id={id} data-size={size} />;
}

interface EditableFacadeProps {
  value?: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: string) => void;
  children?: ReactNode;
}

/** The one-tag path: a named value with the house edit controls. Modes,
 * custom triggers, and alternate editors stay on the anatomy. */
function EditableFacade({
  value,
  defaultValue,
  label,
  placeholder,
  disabled = false,
  invalid = false,
  required = false,
  size = "md",
  onValueChange,
}: EditableFacadeProps) {
  return (
    <EditableRoot
      size={size}
      disabled={disabled}
      invalid={invalid}
      required={required}
      placeholder={placeholder}
      defaultValue={defaultValue}
      {...(value === undefined
        ? {}
        : {
            value,
            onValueChange: (details: { value: string }) => onValueChange?.(details.value),
          })}
    >
      {label ? <ArkEditable.Label>{label}</ArkEditable.Label> : null}
      <ArkEditable.Area>
        <ArkEditable.Preview />
        <ArkEditable.Input />
      </ArkEditable.Area>
      <ArkEditable.Control>
        <ArkEditable.EditTrigger aria-label="Edit">{iconNode("pencil")}</ArkEditable.EditTrigger>
        <ArkEditable.SubmitTrigger aria-label="Submit">
          {iconNode("check")}
        </ArkEditable.SubmitTrigger>
        <ArkEditable.CancelTrigger aria-label="Cancel">{iconNode("x")}</ArkEditable.CancelTrigger>
      </ArkEditable.Control>
    </EditableRoot>
  );
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while Preview keeps its text rendering. */
export const Editable = Object.assign(EditableFacade, {
  ...ArkEditable,
  Root: EditableRoot,
});

injectComponentStyle("editable");
