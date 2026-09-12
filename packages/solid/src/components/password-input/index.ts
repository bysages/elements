import { PasswordInput as ArkPasswordInput } from "@ark-ui/solid/password-input";
import { injectComponentStyle } from "@bysages/core";

/** Ark's PasswordInput, dressed in the paper-and-ink system: the reveal
 * eye sits quiet at the field's edge and swaps in place — no shift, no
 * noise. The API is Ark's own — Root, Label, Control, Input, Indicator,
 * VisibilityTrigger. */
export const PasswordInput = ArkPasswordInput;

injectComponentStyle("password-input");
