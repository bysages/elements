import { Switch as ArkSwitch } from "@ark-ui/solid/switch";
import type { SwitchRootProps as ArkSwitchRootProps } from "@ark-ui/solid/switch";
import { injectComponentStyle } from "@bysages/core/styling";
import { Show, splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's Switch, dressed in the paper-and-ink system: a track that rests
 * in the inset shade of the paper and fills flat with primary ink when on,
 * the thumb sliding on the spring. The API is Ark's own — Root, Label,
 * Control, Thumb, HiddenInput. */

type SwitchOwnProps = {
  /** One rung for the thumb; the track travels with it. */
  size?: "sm" | "md" | "lg";
};

function SwitchRoot(props: ArkSwitchRootProps & SwitchOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("switch", () => rest.id);
  return <ArkSwitch.Root {...rest} id={id()} data-size={own.size ?? "md"} />;
}

/** The complete switch behind one on/off state and its label. */
export interface SwitchFacadeProps {
  checked?: boolean;
  defaultValue?: boolean;
  label?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  readOnly?: boolean;
  /** One rung for the thumb; the track travels with it. */
  size?: "sm" | "md" | "lg";
  onCheckedChange?: (checked: boolean) => void;
}

function SwitchFacade(props: SwitchFacadeProps) {
  injectComponentStyle("switch");

  return (
    <SwitchRoot
      size={props.size ?? "md"}
      disabled={props.disabled}
      invalid={props.invalid}
      readOnly={props.readOnly}
      required={props.required}
      defaultChecked={props.defaultValue ?? false}
      {...(props.checked === undefined ? {} : { checked: props.checked })}
      onCheckedChange={(details: { checked: boolean }) => props.onCheckedChange?.(details.checked)}
    >
      <ArkSwitch.Control>
        <ArkSwitch.Thumb />
      </ArkSwitch.Control>
      <Show when={props.label}>
        <ArkSwitch.Label>{props.label}</ArkSwitch.Label>
      </Show>
      <ArkSwitch.HiddenInput />
    </SwitchRoot>
  );
}

type SwitchParts = Omit<typeof ArkSwitch, "Root"> & { Root: typeof SwitchRoot };

/* Ark's namespace is frozen — spread copies the members so the facade
 * coexists with the anatomy while Root stays the sized wrapper. */
export const Switch: typeof SwitchFacade & SwitchParts = defineFamily(SwitchFacade, {
  ...ArkSwitch,
  Root: SwitchRoot,
});

injectComponentStyle("switch");
