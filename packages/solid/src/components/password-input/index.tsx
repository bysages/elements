import { PasswordInput as ArkPasswordInput } from "@ark-ui/solid/password-input";
import type { PasswordInputRootProps as ArkPasswordInputRootProps } from "@ark-ui/solid/password-input";
import { injectComponentStyle } from "@bysages/core/styling";
import { Show, splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

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
  const id = useElementId("password-input", () => rest.id);
  return <ArkPasswordInput.Root {...rest} id={id()} data-size={own.size ?? "md"} />;
}

export interface PasswordInputFacadeProps {
  value?: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  autoComplete?: "current-password" | "new-password";
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** One rung of the control-height ladder for the field and its eye. */
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: string) => void;
}

/** The one-tag path: the masked field and reveal control. Visibility
 * state, password-manager rules, and validation stay on the anatomy. */
function PasswordInputFacade(props: PasswordInputFacadeProps) {
  injectComponentStyle("password-input");

  return (
    <PasswordInputRoot
      size={props.size ?? "md"}
      autoComplete={props.autoComplete}
      disabled={props.disabled}
      invalid={props.invalid}
      required={props.required}
    >
      <Show when={props.label}>
        <ArkPasswordInput.Label>{props.label}</ArkPasswordInput.Label>
      </Show>
      <ArkPasswordInput.Control>
        <ArkPasswordInput.Input
          placeholder={props.placeholder}
          value={props.value ?? props.defaultValue}
          onInput={(event) => props.onValueChange?.(event.currentTarget.value)}
        />
        <ArkPasswordInput.VisibilityTrigger>
          <ArkPasswordInput.Indicator fallback={iconNode("eye-off")}>
            {iconNode("eye")}
          </ArkPasswordInput.Indicator>
        </ArkPasswordInput.VisibilityTrigger>
      </ArkPasswordInput.Control>
    </PasswordInputRoot>
  );
}

type PasswordInputParts = Omit<typeof ArkPasswordInput, "Root"> & {
  Root: typeof PasswordInputRoot;
};

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const PasswordInput: typeof PasswordInputFacade & PasswordInputParts = defineFamily(
  PasswordInputFacade,
  {
    ...ArkPasswordInput,
    Root: PasswordInputRoot,
  },
);

injectComponentStyle("password-input");
