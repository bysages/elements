import { PinInput as ArkPinInput } from "@ark-ui/react/pin-input";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps } from "react";

import { useElementId } from "../../internal/id";

type PinInputRootProps = ComponentProps<typeof ArkPinInput.Root> & {
  /** One rung of the control-height ladder each seal stands on. */
  size?: "sm" | "md" | "lg";
};

function PinInputRoot(props: PinInputRootProps) {
  const id = useElementId("pin-input", props);
  const { size = "md", ...rest } = props;

  return <ArkPinInput.Root {...rest} id={id} data-size={size} />;
}

interface PinInputFacadeProps {
  value?: string[];
  defaultValue?: string[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  length?: number;
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: string[]) => void;
}

/** The one-tag path for an even run of seals; OTP, masks, and custom
 * validation stay on the anatomy. */
function PinInputFacade({
  value,
  defaultValue,
  label,
  placeholder = "·",
  disabled = false,
  invalid = false,
  required = false,
  length = 4,
  size = "md",
  onValueChange,
}: PinInputFacadeProps) {
  return (
    <PinInputRoot
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
            onValueChange: (details: { value: string[] }) => onValueChange?.(details.value),
          })}
    >
      {label ? <ArkPinInput.Label>{label}</ArkPinInput.Label> : null}
      <ArkPinInput.Control>
        {Array.from({ length }, (_, index) => (
          <ArkPinInput.Input key={index} index={index} />
        ))}
      </ArkPinInput.Control>
      <ArkPinInput.HiddenInput />
    </PinInputRoot>
  );
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const PinInput = Object.assign(PinInputFacade, {
  ...ArkPinInput,
  Root: PinInputRoot,
});

injectComponentStyle("pin-input");
