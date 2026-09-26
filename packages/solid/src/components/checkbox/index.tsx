import { Checkbox as ArkCheckbox } from "@ark-ui/solid/checkbox";
import type { CheckboxRootProps as ArkCheckboxRootProps } from "@ark-ui/solid/checkbox";
import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";

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
  return <ArkCheckbox.Root {...rest} data-size={own.size ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Checkbox: Omit<typeof ArkCheckbox, "Root"> & { Root: typeof CheckboxRoot } = {
  ...ArkCheckbox,
  Root: CheckboxRoot,
};

injectComponentStyle("checkbox");
