import { h } from "vue";
import { z } from "zod";

import { labelled, slug } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { SegmentGroup } from "./index";

/** A divided pill where one segment is selected. */
export default defineEntry({
  SegmentGroup: {
    props: z.object({ label: z.string().optional(), items: z.array(z.string()).optional() }),
    description: "A divided pill where one segment is selected.",
    component: ({ props }) => {
      const values = props.items ?? ["Day", "Week", "Month"];
      return labelled(
        props.label,
        h(SegmentGroup.Root as never, { defaultValue: slug(values[0] ?? "") }, () => [
          h(SegmentGroup.Indicator),
          ...values.map((value: string) =>
            h(SegmentGroup.Item as never, { key: value, value: slug(value) }, () => [
              h(SegmentGroup.ItemText, () => value),
              h(SegmentGroup.ItemControl),
              h(SegmentGroup.ItemHiddenInput as never),
            ]),
          ),
        ]),
      );
    },
  },
});
