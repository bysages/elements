import { h } from "vue";
import { z } from "zod";

import { labelled } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { RatingGroup } from "./index";

/** Stars out of a maximum; the value is the filled count. */
export default defineEntry({
  RatingGroup: {
    props: z.object({
      label: z.string().optional(),
      value: z.number().optional(),
      count: z.number().int().optional(),
    }),
    description: "Stars out of a maximum; the value is the filled count.",
    component: ({ props }) => {
      const star = () =>
        h(
          "svg",
          {
            width: 16,
            height: 16,
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "currentColor",
            "stroke-width": 1.75,
            "aria-hidden": true,
          },
          [
            h("path", {
              d: "M12 3l2.7 5.8 6.3.8-4.6 4.4 1.2 6.3L12 17.3 6.4 20.3l1.2-6.3L3 9.6l6.3-.8Z",
            }),
          ],
        );
      return labelled(
        props.label,
        h(
          RatingGroup.Root as never,
          { defaultValue: props.value ?? 3, count: props.count ?? 5 } as never,
          () => [
            h(RatingGroup.Control, () => [
              h(RatingGroup.Context, null, {
                default: ({ items }: { items: number[] }) =>
                  items.map((item) =>
                    h(RatingGroup.Item, { key: item, index: item }, { default: () => star() }),
                  ),
              }),
              h(RatingGroup.HiddenInput as never),
            ]),
          ],
        ),
      );
    },
  },
});
