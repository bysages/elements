import { PinInput as ArkPinInput } from "@ark-ui/solid/pin-input";
import type { PinInputRootProps as ArkPinInputRootProps } from "@ark-ui/solid/pin-input";
import { injectComponentStyle } from "@bysages/core/styling";
import { splitProps } from "solid-js";

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

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const PinInput: typeof PinInputRoot &
  Omit<typeof ArkPinInput, "Root"> & { Root: typeof PinInputRoot } = defineFamily(PinInputRoot, {
  ...ArkPinInput,
  Root: PinInputRoot,
});

injectComponentStyle("pin-input");
