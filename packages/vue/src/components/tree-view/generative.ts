import { h } from "vue";
import { z } from "zod";

import { slug } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { TreeView } from "./index";

/** A foldable tree of nodes. */
export default defineEntry({
  TreeView: {
    props: z.object({ items: z.array(z.string()).optional() }),
    description: "A foldable tree of nodes.",
    component: ({ props }) => {
      type Node = { value: string; label: string; children?: Node[] };
      const source: Node[] = props.items?.length
        ? props.items.map((name: string) => ({ value: slug(name), label: name }))
        : [
            {
              value: "ink",
              label: "ink",
              children: [
                { value: "ink/brush", label: "brush.md" },
                { value: "ink/stone", label: "stone.md" },
              ],
            },
            {
              value: "paper",
              label: "paper",
              children: [{ value: "paper/xuan", label: "xuan.md" }],
            },
          ];
      return h(TreeView, { options: source });
    },
  },
});
