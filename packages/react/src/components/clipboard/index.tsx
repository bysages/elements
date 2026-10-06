import { Clipboard as ArkClipboard } from "@ark-ui/react/clipboard";
import { injectComponentStyle } from "@bysages/core";
import type { CSSProperties } from "react";
import type { ComponentProps, HTMLAttributes } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Ark's Clipboard, dressed in the paper-and-ink system: a hairline value
 * field beside an icon-sized copy trigger whose ink turns bamboo while the
 * copy is confirmed. The API is Ark's own — Root, Label, Control, Input,
 * Trigger, Indicator, Context, HiddenInput. */

type ClipboardRootProps = ComponentProps<typeof ArkClipboard.Root> &
  Pick<HTMLAttributes<HTMLDivElement>, "className" | "style"> & {
    /** One rung of the control-height ladder for the value field and
     * its copy seal. */
    size?: "sm" | "md" | "lg";
  };

function ClipboardRoot(props: ClipboardRootProps) {
  injectComponentStyle("clipboard");
  const id = useElementId("clipboard", props);
  const { size = "md", ...rest } = props;

  return <ArkClipboard.Root {...rest} id={id} data-size={size} />;
}

type ClipboardFacadeProps = {
  value?: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
  onValueChange?: (value: string) => void;
};

/** The complete copy field behind one value: a labelled read-only input and
 * its confirmed copy trigger. */
function ClipboardFacade(props: ClipboardFacadeProps) {
  const {
    value,
    defaultValue,
    label,
    placeholder,
    size = "md",
    className,
    style,
    onValueChange,
  } = props;

  return (
    <ClipboardRoot
      size={size}
      defaultValue={defaultValue}
      value={value}
      className={className}
      style={style}
      onValueChange={(event: { value: string }) => onValueChange?.(event.value)}
    >
      {label ? <ArkClipboard.Label>{label}</ArkClipboard.Label> : null}
      <ArkClipboard.Control>
        <ArkClipboard.Input placeholder={placeholder} />
        <ArkClipboard.Trigger>
          <ArkClipboard.Indicator copied={iconNode("check", { width: 14, height: 14 })}>
            {iconNode("copy", { width: 14, height: 14 })}
          </ArkClipboard.Indicator>
        </ArkClipboard.Trigger>
      </ArkClipboard.Control>
    </ClipboardRoot>
  );
}

export const Clipboard: typeof ClipboardFacade &
  Omit<typeof ArkClipboard, "Root"> & { Root: typeof ClipboardRoot } = Object.assign(
  ClipboardFacade,
  {
    ...ArkClipboard,
    Root: ClipboardRoot,
  },
) as typeof ClipboardFacade & Omit<typeof ArkClipboard, "Root"> & { Root: typeof ClipboardRoot };
