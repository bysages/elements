import { Checkbox as ArkCheckbox } from "@ark-ui/solid/checkbox";
import type { CheckboxRootProps as ArkCheckboxRootProps } from "@ark-ui/solid/checkbox";
import { injectComponentStyle } from "@bysages/core/styling";
import { Show, splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Ark's Checkbox, dressed in the paper-and-ink system: a square-cut seal
 * that fills flat with primary ink when ticked, the mark springing into
 * place. The API is Ark's own — Root, Label, Control, Indicator,
 * HiddenInput. */

type CheckboxOwnProps = {
  /** One rung for the control's box: the tick scales with it. */
  size?: "sm" | "md" | "lg";
};

function CheckboxRoot(props: ArkCheckboxRootProps & CheckboxOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("checkbox", () => rest.id);
  return <ArkCheckbox.Root {...rest} id={id()} data-size={own.size ?? "md"} />;
}

/** The complete checkbox behind one checked state and its label. */
export interface CheckboxFacadeProps {
  checked?: boolean;
  defaultValue?: boolean;
  label?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  readOnly?: boolean;
  /** One rung for the control's box: the tick scales with it. */
  size?: "sm" | "md" | "lg";
  onCheckedChange?: (checked: boolean) => void;
}

function CheckboxFacade(props: CheckboxFacadeProps) {
  injectComponentStyle("checkbox");

  return (
    <CheckboxRoot
      size={props.size ?? "md"}
      disabled={props.disabled}
      invalid={props.invalid}
      readOnly={props.readOnly}
      required={props.required}
      defaultChecked={props.defaultValue ?? false}
      {...(props.checked === undefined ? {} : { checked: props.checked })}
      onCheckedChange={(details: { checked: boolean | "indeterminate" }) =>
        props.onCheckedChange?.(details.checked === true)
      }
    >
      <ArkCheckbox.Control>
        <ArkCheckbox.Indicator>
          {iconNode("check", { width: 14, height: 14 })}
        </ArkCheckbox.Indicator>
      </ArkCheckbox.Control>
      <Show when={props.label}>
        <ArkCheckbox.Label>{props.label}</ArkCheckbox.Label>
      </Show>
      <ArkCheckbox.HiddenInput />
    </CheckboxRoot>
  );
}

type CheckboxParts = Omit<typeof ArkCheckbox, "Root"> & {
  Root: typeof CheckboxRoot;
};

/* Ark's namespace is frozen — spread copies the members so the facade
 * coexists with the anatomy while Root stays the sized wrapper. */
export const Checkbox: typeof CheckboxFacade & CheckboxParts = defineFamily(CheckboxFacade, {
  ...ArkCheckbox,
  Root: CheckboxRoot,
});

injectComponentStyle("checkbox");
