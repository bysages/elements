import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { ImageViewer } from "./index";

/** An image that opens large for close reading. */
export default defineEntry({
  ImageViewer: {
    props: z.object({ src: z.string().optional() }),
    description: "An image that opens large for close reading.",
    component: ({ props }) =>
      h(
        ImageViewer as never,
        {
          src: props.src ?? "https://picsum.photos/seed/elements/960/540",
        } as never,
      ),
  },
});
