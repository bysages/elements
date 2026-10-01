import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { CascadeSelect } from "./index";

/** A choice that opens dependent columns of options. */
export default defineEntry({
  CascadeSelect: {
    props: z.object({ placeholder: z.string().optional() }),
    description: "A choice that opens dependent columns of options.",
    component: ({ props }) => {
      const data = props.items?.length
        ? props.items.map((item: string) => ({
            value: item,
            label: item,
            children: [
              { value: item + "-1", label: item + " I" },
              { value: item + "-2", label: item + " II" },
            ],
          }))
        : [
            {
              value: "ink",
              label: "Ink",
              children: [
                { value: "ink-brush", label: "Brush" },
                { value: "ink-stone", label: "Stone" },
              ],
            },
            {
              value: "paper",
              label: "Paper",
              children: [
                { value: "paper-xuan", label: "Xuan" },
                { value: "paper-mian", label: "Mian" },
              ],
            },
          ];
      return h(
        CascadeSelect as never,
        {
          data,
          placeholder: props.placeholder,
        } as never,
      );
    },
  },
});
