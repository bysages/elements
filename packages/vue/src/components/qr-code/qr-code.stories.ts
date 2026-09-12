import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { QrCode } from "./index.js";

const meta: Meta = { title: "Components / Qr Code" };
export default meta;

function sealGlyph() {
  return h(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [
      h("rect", { x: 4, y: 4, width: 16, height: 16, rx: 3 }),
      h("path", { d: "M8.5 12h7M12 8.5v7" }),
    ],
  );
}

/** The code prints in ink; an overlaid paper badge carries a mark, and the
 * download control stays a quiet seal beneath it. */
export const Basic = {
  render: () =>
    h(QrCode.Root, { defaultValue: "https://elements.bysages.com" }, () => [
      h(QrCode.Frame, () => h(QrCode.Pattern)),
      h(QrCode.Overlay, () => sealGlyph()),
      h(
        QrCode.DownloadTrigger,
        { fileName: "qr-code.png", mimeType: "image/png" },
        () => "Download PNG",
      ),
    ]),
};
