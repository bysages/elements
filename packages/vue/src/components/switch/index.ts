import { Switch as ArkSwitch } from "@ark-ui/vue/switch";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Switch, dressed in the paper-and-ink system: a track that rests
 * in the inset shade of the paper and fills flat with primary ink when on,
 * the thumb sliding on the spring. The API is Ark's own — Root, Label,
 * Control, Thumb, HiddenInput. */
export const Switch = ArkSwitch;

injectComponentStyle("switch");
