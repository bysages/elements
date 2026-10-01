import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { ToggleGroup } from "./index";

/** A row of pressed-or-not siblings; multiple allows several held at once. */
export default defineEntry({
  ToggleGroup: {
    props: z.object({
      items: z.array(z.string()).optional(),
      multiple: z.boolean().optional(),
      size: z.enum(["sm", "md", "lg"]).optional(),
    }),
    description: "A row of pressed-or-not siblings; multiple allows several held at once.",
    component: ({ props }) => {
      const values = props.items ?? ["Bold", "Italic", "Underline"];
      return h(
        ToggleGroup.Root as never,
        { multiple: props.multiple ?? false, size: props.size ?? undefined },
        () =>
          values.map((value: string) =>
            h(ToggleGroup.Item as never, { key: value, value, "aria-label": value }, () => value),
          ),
      );
    },
  },
});
