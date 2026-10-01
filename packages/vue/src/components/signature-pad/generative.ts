import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { SignaturePad } from "./index";

/** A pad the hand signs with a pointer. */
export default defineEntry({
  SignaturePad: {
    props: z.object({}),
    description: "A pad the hand signs with a pointer.",
    component: ({ props }) =>
      h(SignaturePad.Root as never, {}, () => [
        h(SignaturePad.Label, () => props.label ?? "Signature"),
        h(SignaturePad.Control, () => h(SignaturePad.Guide as never)),
        h(SignaturePad.ClearTrigger, () => "Clear"),
        h(SignaturePad.HiddenInput as never),
      ]),
  },
});
