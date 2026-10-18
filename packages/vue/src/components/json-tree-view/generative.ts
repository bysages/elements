import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { JsonTreeView } from "./index";

/** JSON rendered as a foldable tree. */
export default defineEntry({
  JsonTreeView: {
    props: z.object({ data: z.unknown().optional() }),
    description: "JSON rendered as a foldable tree.",
    component: ({ props }) =>
      h(JsonTreeView, {
        data: props.data ?? {
          name: "elements",
          scene: ["missive", "dispatch"],
          tokens: { pigment: "qinghua", radius: "6px" },
        },
      }),
  },
});
