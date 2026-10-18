import { h } from "vue";
import { z } from "zod";

import { slug } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { SegmentGroup } from "./index";

/** A divided pill where one segment is selected. */
export default defineEntry({
  SegmentGroup: {
    props: z.object({ label: z.string().optional(), items: z.array(z.string()).optional() }),
    description: "A divided pill where one segment is selected.",
    component: ({ props }) => {
      const values = props.items ?? ["Day", "Week", "Month"];
      return h(SegmentGroup, {
        label: props.label,
        items: values.map((value: string) => ({ value: slug(value), label: value })),
        defaultValue: slug(values[0] ?? ""),
      });
    },
  },
});
