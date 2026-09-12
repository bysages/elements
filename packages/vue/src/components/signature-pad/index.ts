import { SignaturePad as ArkSignaturePad } from "@ark-ui/vue/signature-pad";
import { injectComponentStyle } from "@bysages/core";

/** Ark's SignaturePad, dressed in the paper-and-ink system: a quiet paper
 * field with a guide hairline where ink — real ink strokes — is laid down.
 * The API is Ark's own — Root, Label, Control, Segment, SegmentPath, Guide,
 * ClearTrigger, HiddenInput, Context. */
export const SignaturePad = ArkSignaturePad;

injectComponentStyle("signature-pad");
