import { PinInput as ArkPinInput } from "@ark-ui/react/pin-input";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

type PinInputRootProps = ComponentProps<typeof ArkPinInput.Root> & {
  /** One rung of the control-height ladder each seal stands on. */
  size?: "sm" | "md" | "lg";
};

function PinInputRoot({ size = "md", ...rest }: PinInputRootProps) {
  return <ArkPinInput.Root {...rest} data-size={size} />;
}

/** Ark's PinInput, dressed in the paper-and-ink system: one character per
 * square-cut seal, centered ink in tabular figures. The API is Ark's own —
 * Root, Label, Control, Input, HiddenInput. */
/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const PinInput: Omit<typeof ArkPinInput, "Root"> & { Root: typeof PinInputRoot } = {
  ...ArkPinInput,
  Root: PinInputRoot,
};

injectComponentStyle("pin-input");
