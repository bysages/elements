import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Skeleton } from "./index";

/** A placeholder shimmer where content is still arriving. */
export default defineEntry({
  Skeleton: {
    props: z.object({ height: z.number().optional() }),
    description: "A placeholder shimmer where content is still arriving.",
    component: ({ props }) =>
      h(Skeleton, { style: props.height != null ? { blockSize: props.height + "px" } : undefined }),
  },
});
