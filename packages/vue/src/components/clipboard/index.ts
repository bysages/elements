import { Clipboard as ArkClipboard } from "@ark-ui/vue/clipboard";
import { injectComponentStyle } from "@bysages/core";

/** Clipboard, dressed in the paper-and-ink system: a hairline value
 * field beside an icon-sized copy trigger whose ink turns bamboo while the
 * copy is confirmed. The parts — Root, Label, Control, Input,
 * Trigger, Indicator, Context, HiddenInput. */
export const Clipboard = ArkClipboard;

injectComponentStyle("clipboard");
