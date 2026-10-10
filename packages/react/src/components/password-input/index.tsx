import { PasswordInput as ArkPasswordInput } from "@ark-ui/react/password-input";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

type PasswordInputRootProps = ComponentProps<typeof ArkPasswordInput.Root> & {
  /** One rung of the control-height ladder for the field and its eye. */
  size?: "sm" | "md" | "lg";
};

function PasswordInputRoot(props: PasswordInputRootProps) {
  const id = useElementId("password-input", props);
  const { size = "md", ...rest } = props;

  return <ArkPasswordInput.Root {...rest} id={id} data-size={size} />;
}

interface PasswordInputFacadeProps {
  value?: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  autoComplete?: "current-password" | "new-password";
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: string) => void;
}

/** The one-tag path: the masked field and reveal control. Visibility
 * state, password-manager rules, and validation stay on the anatomy. */
function PasswordInputFacade({
  value,
  defaultValue,
  label,
  placeholder,
  autoComplete,
  disabled = false,
  invalid = false,
  required = false,
  size = "md",
  onValueChange,
}: PasswordInputFacadeProps) {
  return (
    <PasswordInputRoot
      size={size}
      autoComplete={autoComplete}
      disabled={disabled}
      invalid={invalid}
      required={required}
    >
      {label ? <ArkPasswordInput.Label>{label}</ArkPasswordInput.Label> : null}
      <ArkPasswordInput.Control>
        <ArkPasswordInput.Input
          placeholder={placeholder}
          defaultValue={defaultValue}
          {...(value === undefined
            ? {}
            : {
                value,
                onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
                  onValueChange?.(event.target.value),
              })}
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

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const PasswordInput = Object.assign(PasswordInputFacade, {
  ...ArkPasswordInput,
  Root: PasswordInputRoot,
});

injectComponentStyle("password-input");
