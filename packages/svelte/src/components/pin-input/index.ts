/** Ark's PinInput, dressed in the paper-and-ink system: one character per
 * square-cut seal, centered ink in tabular figures. The API is Ark's own —
 * Root, Label, Control, Input, HiddenInput. */
import { PinInput as ArkPinInput } from "@ark-ui/svelte/pin-input";

import { defineFamily } from "../../internal/family";
import PinInputFacade from "./PinInput.svelte";
import PinInputRoot from "./PinInputRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const PinInput: typeof PinInputFacade &
  Omit<typeof ArkPinInput, "Root"> & {
    Root: typeof PinInputRoot;
  } = defineFamily(PinInputFacade, {
  ...ArkPinInput,
  Root: PinInputRoot,
});
