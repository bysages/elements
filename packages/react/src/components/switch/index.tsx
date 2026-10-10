import { Switch as ArkSwitch } from "@ark-ui/react/switch";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ComponentProps } from "react";

import { useElementId } from "../../internal/id";

type SwitchRootProps = ComponentProps<typeof ArkSwitch.Root> & {
  /** One rung for the thumb; the track travels with it. */
  size?: "sm" | "md" | "lg";
};

function SwitchRoot(props: SwitchRootProps) {
  const id = useElementId("switch", props);
  const { size = "md", ...rest } = props;

  return <ArkSwitch.Root {...rest} id={id} data-size={size} />;
}

export interface SwitchFacadeProps {
  value?: boolean;
  defaultValue?: boolean;
  label?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  readOnly?: boolean;
  /** One rung for the thumb; the track travels with it. */
  size?: "sm" | "md" | "lg";
  className?: string;
  onValueChange?: (value: boolean) => void;
}

function SwitchFacade({
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
}: SwitchFacadeProps) {
  return (
    <SwitchRoot
      className={className}
      size={size}
      disabled={disabled}
      invalid={invalid}
      readOnly={readOnly}
      required={required}
      defaultChecked={defaultValue}
      {...(value === undefined ? {} : { checked: value })}
      onCheckedChange={(details: { checked: boolean }) => onValueChange?.(details.checked)}
    >
      <ArkSwitch.Control>
        <ArkSwitch.Thumb />
      </ArkSwitch.Control>
      {label ? <ArkSwitch.Label>{label}</ArkSwitch.Label> : null}
      <ArkSwitch.HiddenInput />
    </SwitchRoot>
  );
}

SwitchFacade.displayName = "SSwitch";

/** Ark's Switch, dressed in the paper-and-ink system: a track that rests
 * in the inset shade of the paper and fills flat with primary ink when on,
 * the thumb sliding on the spring. The API is Ark's own — Root, Label,
 * Control, Thumb, HiddenInput. */
type SwitchParts = Omit<typeof ArkSwitch, "Root"> & { Root: typeof SwitchRoot };

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Switch = Object.assign(SwitchFacade, {
  ...ArkSwitch,
  Root: SwitchRoot,
}) as typeof SwitchFacade & SwitchParts;

injectComponentStyle("switch");
