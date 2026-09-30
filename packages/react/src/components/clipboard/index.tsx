import { Clipboard as ArkClipboard } from "@ark-ui/react/clipboard";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

/** Ark's Clipboard, dressed in the paper-and-ink system: a hairline value
 * field beside an icon-sized copy trigger whose ink turns bamboo while the
 * copy is confirmed. The API is Ark's own — Root, Label, Control, Input,
 * Trigger, Indicator, Context, HiddenInput. */

type ClipboardRootProps = ComponentProps<typeof ArkClipboard.Root> & {
  /** One rung of the control-height ladder for the value field and
   * its copy seal. */
  size?: "sm" | "md" | "lg";
};

function ClipboardRoot({ size = "md", ...rest }: ClipboardRootProps) {
  return <ArkClipboard.Root {...rest} data-size={size} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Clipboard: Omit<typeof ArkClipboard, "Root"> & {
  Root: typeof ClipboardRoot;
} = {
  ...ArkClipboard,
  Root: ClipboardRoot,
};

injectComponentStyle("clipboard");
