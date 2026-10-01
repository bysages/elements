import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { ImageCropper } from "./index";

/** An image with a cropping frame. */
export default defineEntry({
  ImageCropper: {
    props: z.object({ src: z.string().optional() }),
    description: "An image with a cropping frame.",
    component: ({ props }) => {
      const src = props.src ?? "https://picsum.photos/seed/elements/960/540";
      return h(ImageCropper.Root as never, {}, () => [
        h(ImageCropper.Viewport, () => [
          h(ImageCropper.Image as never, { src, alt: "Crop source" }),
          h(ImageCropper.Selection, () => [
            h(ImageCropper.Grid, { axis: "horizontal" }),
            h(ImageCropper.Grid, { axis: "vertical" }),
            h(ImageCropper.Handle, { position: "nw" } as never, () => h("div")),
            h(ImageCropper.Handle, { position: "se" } as never, () => h("div")),
          ]),
        ]),
      ]);
    },
  },
});
