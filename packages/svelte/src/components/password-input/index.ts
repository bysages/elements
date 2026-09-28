/** Ark's PasswordInput, dressed in the paper-and-ink system: the reveal
 * eye sits quiet at the field's edge and swaps in place — no shift, no
 * noise. The API is Ark's own — Root, Label, Control, Input, Indicator,
 * VisibilityTrigger. */
import { PasswordInput as ArkPasswordInput } from "@ark-ui/svelte/password-input";

import PasswordInputRoot from "./PasswordInputRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const PasswordInput: Omit<typeof ArkPasswordInput, "Root"> & {
  Root: typeof PasswordInputRoot;
} = {
  ...ArkPasswordInput,
  Root: PasswordInputRoot,
};
