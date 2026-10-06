import { h } from "vue";
import { z } from "zod";

import { labelled } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { iconNode } from "../../internal/icon";
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
      const starIcon = () => iconNode("star");
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
                    h(RatingGroup.Item, { key: item, index: item }, { default: () => starIcon() }),
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
