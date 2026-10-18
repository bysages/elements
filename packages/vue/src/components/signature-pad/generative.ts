import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { SignaturePad } from "./index";

/** A pad the hand signs with a pointer. */
export default defineEntry({
  SignaturePad: {
    props: z.object({ label: z.string().optional() }),
    description: "A pad the hand signs with a pointer.",
    component: ({ props }) => h(SignaturePad, { label: props.label ?? "Signature" }),
  },
});
