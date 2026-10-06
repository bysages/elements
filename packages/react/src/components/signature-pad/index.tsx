import { SignaturePad as ArkSignaturePad } from "@ark-ui/react/signature-pad";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps, ReactNode } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** SignaturePad, dressed in the paper-and-ink system: a quiet paper
 * field with a guide hairline where ink — real ink strokes — is laid down.
 * The parts — Root, Label, Control, Segment, SegmentPath, Guide,
 * ClearTrigger, HiddenInput, Context. */
function SignaturePadRoot(props: ComponentProps<typeof ArkSignaturePad.Root>) {
  const id = useElementId("signature-pad", props);

  return <ArkSignaturePad.Root {...props} id={id} />;
}

interface SignaturePadFacadeProps {
  value?: string[];
  defaultValue?: string[];
  label?: string;
  /** Show the reset control. */
  clearable?: boolean;
  disabled?: boolean;
  onValueChange?: (paths: string[]) => void;
  children?: ReactNode;
}

/** The one-tag path: the paper, guide, clear control, and hidden form
 * value; stroke previews and drawing events stay on the anatomy. */
function SignaturePadFacade({
  value,
  defaultValue,
  label,
  clearable = true,
  disabled = false,
  onValueChange,
}: SignaturePadFacadeProps) {
  return (
    <SignaturePadRoot
      disabled={disabled}
      defaultPaths={defaultValue}
      {...(value === undefined
        ? {}
        : {
            paths: value,
            onDraw: (details: { paths: string[] }) => onValueChange?.(details.paths),
          })}
    >
      {label ? <ArkSignaturePad.Label>{label}</ArkSignaturePad.Label> : null}
      <ArkSignaturePad.Control>
        <ArkSignaturePad.Segment />
        {clearable ? (
          <ArkSignaturePad.ClearTrigger>{iconNode("undo")}</ArkSignaturePad.ClearTrigger>
        ) : null}
        <ArkSignaturePad.Guide />
      </ArkSignaturePad.Control>
      <ArkSignaturePad.HiddenInput value="" />
    </SignaturePadRoot>
  );
}

export const SignaturePad = Object.assign(SignaturePadFacade, {
  ...ArkSignaturePad,
  Root: SignaturePadRoot as unknown as typeof ArkSignaturePad.Root,
});

injectComponentStyle("signature-pad");
