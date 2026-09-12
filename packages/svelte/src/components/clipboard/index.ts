import { Clipboard as ArkClipboard } from "@ark-ui/svelte/clipboard";
import { injectComponentStyle } from "@bysages/core";

/** Ark's Clipboard, dressed in the paper-and-ink system: a hairline value
 * field beside an icon-sized copy trigger whose ink turns bamboo while the
 * copy is confirmed. The API is Ark's own — Root, Label, Control, Input,
 * Trigger, Indicator, Context, HiddenInput. */
export const Clipboard = ArkClipboard;

injectComponentStyle("clipboard");
