import { PasswordInput as ArkPasswordInput } from "@ark-ui/solid/password-input";
import type { PasswordInputRootProps as ArkPasswordInputRootProps } from "@ark-ui/solid/password-input";
import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";

/** Ark's PasswordInput, dressed in the paper-and-ink system: the reveal
 * eye sits quiet at the field's edge and swaps in place — no shift, no
 * noise. The API is Ark's own — Root, Label, Control, Input, Indicator,
 * VisibilityTrigger. */

type PasswordInputOwnProps = {
  /** One rung of the control-height ladder for the field and its eye. */
  size?: "sm" | "md" | "lg";
};

function PasswordInputRoot(props: ArkPasswordInputRootProps & PasswordInputOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  return <ArkPasswordInput.Root {...rest} data-size={own.size ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const PasswordInput: Omit<typeof ArkPasswordInput, "Root"> & {
  Root: typeof PasswordInputRoot;
} = {
  ...ArkPasswordInput,
  Root: PasswordInputRoot,
};

injectComponentStyle("password-input");
