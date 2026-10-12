import { SignaturePad as ArkSignaturePad } from "@ark-ui/solid/signature-pad";
import { injectComponentStyle } from "@bysages/core/styling";
import { createComponent, mergeProps, Show, type ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** Ark's SignaturePad, dressed in the paper-and-ink system: a quiet paper
 * field with a guide hairline where ink — real ink strokes — is laid down.
 * The API is Ark's own — Root, Label, Control, Segment, SegmentPath, Guide,
 * ClearTrigger, HiddenInput, Context. */
function SignaturePadRoot(props: ComponentProps<typeof ArkSignaturePad.Root>) {
  const id = useElementId("signature-pad", () => props.id);

  return createComponent(
    ArkSignaturePad.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

/** The one-tag path: the paper, guide, clear control, and hidden form
 * value; stroke previews and drawing events stay on the anatomy. */
export interface SignaturePadFacadeProps {
  value?: string[];
  defaultValue?: string[];
  label?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  /** Show the reset control. */
  clearable?: boolean;
  onValueChange?: (value: string[]) => void;
}

function SignaturePadFacade(props: SignaturePadFacadeProps) {
  injectComponentStyle("signature-pad");

  return (
    <SignaturePadRoot
      disabled={props.disabled}
      required={props.required}
      defaultPaths={props.defaultValue}
      data-invalid={props.invalid || undefined}
      {...(props.value === undefined ? {} : { paths: props.value })}
      onDraw={(details) => props.onValueChange?.(details.paths)}
    >
      <Show when={props.label}>
        <ArkSignaturePad.Label>{props.label}</ArkSignaturePad.Label>
      </Show>
      <ArkSignaturePad.Control>
        <ArkSignaturePad.Segment />
        <Show when={props.clearable !== false}>
          <ArkSignaturePad.ClearTrigger>
            {iconNode("undo", { width: "14", height: "14" })}
          </ArkSignaturePad.ClearTrigger>
        </Show>
        <ArkSignaturePad.Guide />
      </ArkSignaturePad.Control>
      <ArkSignaturePad.Context>
        {(signaturePad) => <ArkSignaturePad.HiddenInput value={signaturePad().paths.join(" ")} />}
      </ArkSignaturePad.Context>
    </SignaturePadRoot>
  );
}

type SignaturePadParts = Omit<typeof ArkSignaturePad, "Root"> & {
  Root: typeof SignaturePadRoot;
};

export const SignaturePad: typeof SignaturePadFacade & SignaturePadParts = defineFamily(
  SignaturePadFacade,
  {
    ...ArkSignaturePad,
    Root: SignaturePadRoot,
  },
);
injectComponentStyle("signature-pad");
