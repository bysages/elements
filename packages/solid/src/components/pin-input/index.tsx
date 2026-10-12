import { PinInput as ArkPinInput } from "@ark-ui/solid/pin-input";
import type { PinInputRootProps as ArkPinInputRootProps } from "@ark-ui/solid/pin-input";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, Show, splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's PinInput, dressed in the paper-and-ink system: one character per
 * square-cut seal, centered ink in tabular figures. The API is Ark's own —
 * Root, Label, Control, Input, HiddenInput. */

type PinInputOwnProps = {
  /** One rung of the control-height ladder each seal stands on. */
  size?: "sm" | "md" | "lg";
};

function PinInputRoot(props: ArkPinInputRootProps & PinInputOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("pin-input", () => rest.id);
  return <ArkPinInput.Root {...rest} id={id()} data-size={own.size ?? "md"} />;
}

export interface PinInputFacadeProps {
  value?: string[];
  defaultValue?: string[];
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  length?: number;
  /** One rung of the control-height ladder each seal stands on. */
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: string[]) => void;
}

/** The one-tag path for an even run of seals; OTP, masks, and custom
 * validation stay on the anatomy. */
function PinInputFacade(props: PinInputFacadeProps) {
  injectComponentStyle("pin-input");

  return (
    <PinInputRoot
      size={props.size ?? "md"}
      disabled={props.disabled}
      invalid={props.invalid}
      required={props.required}
      placeholder={props.placeholder ?? "·"}
      defaultValue={props.defaultValue}
      {...(props.value === undefined ? {} : { value: props.value })}
      onValueChange={(details: { value: string[] }) => props.onValueChange?.(details.value)}
    >
      <Show when={props.label}>
        <ArkPinInput.Label>{props.label}</ArkPinInput.Label>
      </Show>
      <ArkPinInput.Control>
        <For each={Array.from({ length: props.length ?? 4 }, (_, index) => index)}>
          {(index) => <ArkPinInput.Input index={index} />}
        </For>
      </ArkPinInput.Control>
      <ArkPinInput.HiddenInput />
    </PinInputRoot>
  );
}

type PinInputParts = Omit<typeof ArkPinInput, "Root"> & { Root: typeof PinInputRoot };

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const PinInput: typeof PinInputFacade & PinInputParts = defineFamily(PinInputFacade, {
  ...ArkPinInput,
  Root: PinInputRoot,
});

injectComponentStyle("pin-input");
