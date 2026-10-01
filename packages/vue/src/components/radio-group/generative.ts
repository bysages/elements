import { h } from "vue";
import { z } from "zod";

import { labelled, slug } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { RadioGroup } from "./index";

/** Several boxes where exactly one may hold. */
export default defineEntry({
  RadioGroup: {
    props: z.object({ label: z.string().optional(), items: z.array(z.string()).optional() }),
    description: "Several boxes where exactly one may hold.",
    component: ({ props }) => {
      const values = props.items ?? ["Xuan", "Mian", "Lusong"];
      return labelled(
        props.label,
        h(RadioGroup.Root as never, { defaultValue: slug(values[0] ?? "") }, () => [
          h("div", { style: { display: "flex", flexDirection: "column", gap: "0.5rem" } }, () =>
            values.map((value: string) =>
              h(RadioGroup.Item as never, { key: value, value }, () => [
                h(RadioGroup.ItemControl),
                h(RadioGroup.ItemText, () => value),
                h(RadioGroup.ItemHiddenInput as never),
              ]),
            ),
          ),
        ]),
      );
    },
  },
});
