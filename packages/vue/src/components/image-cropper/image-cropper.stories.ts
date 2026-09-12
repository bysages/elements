import type { Meta } from "@storybook/vue3-vite";
import { h } from "vue";

import { ImageCropper } from "./index.js";

const meta: Meta = { title: "Components / Image Cropper" };
export default meta;

// zag positions handles by compass point: n/e/s/w and the four corners
const cornerPositions = ["nw", "ne", "se", "sw"];

/** Drag the lit window to frame, pull the corner seals to resize; the rule
 * of thirds surfaces only while the frame is being decided. */
export const Basic = {
  render: () =>
    h(ImageCropper.Root, () =>
      h(ImageCropper.Viewport, () => [
        h(ImageCropper.Image, {
          src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
          alt: "A mountain valley under morning light",
        }),
        h(ImageCropper.Selection, () => [
          cornerPositions.map((position) =>
            h(ImageCropper.Handle, { key: position, position } as any, () => h("div")),
          ),
          h(ImageCropper.Grid, { axis: "horizontal" }),
          h(ImageCropper.Grid, { axis: "vertical" }),
        ]),
      ]),
    ),
};
