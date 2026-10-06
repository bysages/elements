import { SignaturePad as ArkSignaturePad } from "@ark-ui/svelte/signature-pad";

import { defineFamily } from "../../internal/family";
import SignaturePadFacade from "./SignaturePad.svelte";
import SignaturePadRoot from "./SignaturePadRoot.svelte";

/** Ark's SignaturePad, dressed in the paper-and-ink system: a quiet paper
 * field with a guide hairline where ink — real ink strokes — is laid down.
 * The API is Ark's own — Root, Label, Control, Segment, SegmentPath, Guide,
 * ClearTrigger, HiddenInput, Context. */
export const SignaturePad: typeof SignaturePadFacade &
  Omit<typeof ArkSignaturePad, "Root"> & {
    Root: typeof SignaturePadRoot;
  } = defineFamily(SignaturePadFacade, {
  ...ArkSignaturePad,
  Root: SignaturePadRoot,
});
