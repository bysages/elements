import { SignaturePad as ArkSignaturePad } from "@ark-ui/solid/signature-pad";
import { injectComponentStyle } from "@bysages/core/styling";
import { createComponent, mergeProps, type ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
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

export const SignaturePad: typeof SignaturePadRoot &
  Omit<typeof ArkSignaturePad, "Root"> & { Root: typeof SignaturePadRoot } = defineFamily(
  SignaturePadRoot,
  {
    ...ArkSignaturePad,
    Root: SignaturePadRoot,
  },
);
injectComponentStyle("signature-pad");
