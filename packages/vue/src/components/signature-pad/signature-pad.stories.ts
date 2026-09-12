import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { SignaturePad } from "./index.js";

const meta: Meta = { title: "Components / Signature Pad" };
export default meta;

function undoGlyph() {
  return h(
    "svg",
    {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: "M3 7v6h6M3.5 13a9 9 0 1 0 2-7.5" })],
  );
}

/** Sign below the guide hairline; the clear trigger wipes the paper without
 * leaving the field. */
export const Basic = {
  render: () =>
    h(SignaturePad.Root, () => [
      h(SignaturePad.Label, () => "Sign below"),
      h(SignaturePad.Control, () => [
        h(SignaturePad.Segment),
        h(SignaturePad.ClearTrigger, () => undoGlyph()),
        h(SignaturePad.Guide),
      ]),
      h(SignaturePad.HiddenInput),
    ]),
};
