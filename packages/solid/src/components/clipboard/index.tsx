import { Clipboard as ArkClipboard } from "@ark-ui/solid/clipboard";
import type { ClipboardRootProps as ArkClipboardRootProps } from "@ark-ui/solid/clipboard";
import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's Clipboard, dressed in the paper-and-ink system: a hairline value
 * field beside an icon-sized copy trigger whose ink turns bamboo while the
 * copy is confirmed. The API is Ark's own — Root, Label, Control, Input,
 * Trigger, Indicator, Context, HiddenInput. */

type ClipboardOwnProps = {
  /** One rung of the control-height ladder for the value field and
   * its copy seal. */
  size?: "sm" | "md" | "lg";
};

const ArkRoot = ArkClipboard.Root as (props: ArkClipboardRootProps) => any;

function ClipboardRoot(props: ArkClipboardRootProps & ClipboardOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  const id = useElementId("clipboard", () => rest.id);
  return <ArkRoot {...rest} id={id()} data-size={own.size ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Clipboard: typeof ClipboardRoot &
  Omit<typeof ArkClipboard, "Root"> & { Root: typeof ClipboardRoot } = defineFamily(ClipboardRoot, {
  ...ArkClipboard,
  Root: ClipboardRoot,
});

injectComponentStyle("clipboard");
