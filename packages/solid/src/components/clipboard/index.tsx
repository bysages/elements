import { Clipboard as ArkClipboard } from "@ark-ui/solid/clipboard";
import type { ClipboardRootProps as ArkClipboardRootProps } from "@ark-ui/solid/clipboard";
import { injectComponentStyle } from "@bysages/core/styling";
import { splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
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

export interface ClipboardFacadeProps {
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  label?: string;
  placeholder?: string;
  /** One rung of the control-height ladder for the value field and its copy seal. */
  size?: "sm" | "md" | "lg";
  onValueChange?: (value: string) => void;
}

/** The complete copy field behind one value: a labelled read-only input and
 * its confirmed copy trigger. */
function ClipboardFacade(props: ClipboardFacadeProps) {
  return (
    <ClipboardRoot
      size={props.size ?? "md"}
      defaultValue={props.defaultValue}
      {...(props.value === undefined ? {} : { value: props.value })}
      onValueChange={(details: { value: string }) => props.onValueChange?.(details.value)}
    >
      {props.label ? <ArkClipboard.Label>{props.label}</ArkClipboard.Label> : null}
      <ArkClipboard.Control>
        <ArkClipboard.Input placeholder={props.placeholder} disabled={props.disabled} />
        <ArkClipboard.Trigger disabled={props.disabled}>
          <ArkClipboard.Indicator copied={iconNode("check", { width: "14", height: "14" })}>
            {iconNode("copy", { width: "14", height: "14" })}
          </ArkClipboard.Indicator>
        </ArkClipboard.Trigger>
      </ArkClipboard.Control>
    </ClipboardRoot>
  );
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Clipboard: typeof ClipboardFacade &
  Omit<typeof ArkClipboard, "Root"> & { Root: typeof ClipboardRoot } = defineFamily(
  ClipboardFacade,
  {
    ...ArkClipboard,
    Root: ClipboardRoot,
  },
);

injectComponentStyle("clipboard");
