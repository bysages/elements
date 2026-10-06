/** Ark's Clipboard, dressed in the paper-and-ink system: a hairline value
 * field beside an icon-sized copy trigger whose ink turns bamboo while the
 * copy is confirmed. The API is Ark's own — Root, Label, Control, Input,
 * Trigger, Indicator, Context, HiddenInput. */
import { Clipboard as ArkClipboard } from "@ark-ui/svelte/clipboard";

import { defineFamily } from "../../internal/family";
import ClipboardFacade from "./Clipboard.svelte";
import ClipboardRoot from "./ClipboardRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Clipboard: typeof ClipboardFacade &
  Omit<typeof ArkClipboard, "Root"> & {
    Root: typeof ClipboardRoot;
  } = defineFamily(ClipboardFacade, {
  ...ArkClipboard,
  Root: ClipboardRoot,
});

export type { ClipboardRootProps } from "./props";
