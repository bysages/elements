import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { JsonTreeView } from "./index";

/** JSON rendered as a foldable tree. */
export default defineEntry({
  JsonTreeView: {
    props: z.object({}),
    description: "JSON rendered as a foldable tree.",
    component: ({ props }) => {
      const data = props.data ?? {
        name: "elements",
        scene: ["missive", "dispatch"],
        tokens: { pigment: "qinghua", radius: "6px" },
      };
      return h(JsonTreeView.Root as never, { data } as never, () => [
        h(JsonTreeView.Tree as never),
      ]);
    },
  },
});
