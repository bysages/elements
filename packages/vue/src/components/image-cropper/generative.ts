import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { ImageCropper } from "./index";

/** An image with a cropping frame. */
export default defineEntry({
  ImageCropper: {
    props: z.object({ src: z.string().optional() }),
    description: "An image with a cropping frame.",
    component: ({ props }) =>
      h(ImageCropper, {
        src: props.src ?? "https://picsum.photos/seed/elements/960/540",
        alt: "Crop source",
      }),
  },
});
