import { Checkbox as ArkCheckbox } from "@ark-ui/react/checkbox";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

type CheckboxRootProps = ComponentProps<typeof ArkCheckbox.Root> & {
  /** One rung for the control's box: the tick scales with it. */
  size?: "sm" | "md" | "lg";
};

function CheckboxRoot(props: CheckboxRootProps) {
  const id = useElementId("checkbox", props);
  const { size = "md", ...rest } = props;

  return <ArkCheckbox.Root {...rest} id={id} data-size={size} />;
}

export interface CheckboxFacadeProps {
  value?: boolean;
  defaultValue?: boolean;
  label?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  readOnly?: boolean;
  /** One rung for the control's box: the tick scales with it. */
  size?: "sm" | "md" | "lg";
  className?: string;
  onValueChange?: (value: boolean) => void;
}

function CheckboxFacade({
  value,
  defaultValue = false,
  label,
  disabled = false,
  invalid = false,
  required = false,
  readOnly = false,
  size = "md",
  className,
  onValueChange,
}: CheckboxFacadeProps) {
  return (
    <CheckboxRoot
      className={className}
      size={size}
      disabled={disabled}
      invalid={invalid}
      readOnly={readOnly}
      required={required}
      defaultChecked={defaultValue}
      {...(value === undefined ? {} : { checked: value })}
      onCheckedChange={(details: { checked: boolean | "indeterminate" }) =>
        onValueChange?.(details.checked === true)
      }
    >
      <ArkCheckbox.Control>
        <ArkCheckbox.Indicator>{iconNode("check")}</ArkCheckbox.Indicator>
      </ArkCheckbox.Control>
      {label ? <ArkCheckbox.Label>{label}</ArkCheckbox.Label> : null}
      <ArkCheckbox.HiddenInput />
    </CheckboxRoot>
  );
}

CheckboxFacade.displayName = "SCheckbox";

/** Ark's Checkbox, dressed in the paper-and-ink system: a square-cut seal
 * that fills flat with primary ink when ticked, the mark springing into
 * place. The API is Ark's own — Root, Label, Control, Indicator,
 * HiddenInput. */
type CheckboxParts = Omit<typeof ArkCheckbox, "Root"> & {
  Root: typeof CheckboxRoot;
};

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Checkbox = Object.assign(CheckboxFacade, {
  ...ArkCheckbox,
  Root: CheckboxRoot,
}) as typeof CheckboxFacade & CheckboxParts;

injectComponentStyle("checkbox");
