import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { TreeSelect } from "./index";

/** A choice that opens a tree of options. */
export default defineEntry({
  TreeSelect: {
    props: z.object({ placeholder: z.string().optional() }),
    description: "A choice that opens a tree of options.",
    component: ({ props }) => {
      const leaves = props.items ?? ["Xuan", "Mian", "Lusong"];
      const data = [
        {
          value: "paper",
          label: "Paper",
          children: leaves.map((leaf: string) => ({ value: leaf, label: leaf })),
        },
      ];
      return h(
        TreeSelect as never,
        {
          data,
          placeholder: props.placeholder,
        } as never,
      );
    },
  },
});
