import { h } from "vue";

import { faces } from "../../generative/faces";
import { labelled, slug } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Stack } from "../stack";
import { RadioGroup } from "./index";

/** Several boxes where exactly one may hold. */
export default defineEntry({
  RadioGroup: {
    ...faces.RadioGroup,
    component: ({ props }) => {
      const values = props.items ?? ["Option A", "Option B", "Option C"];
      return labelled(
        props.label,
        h(RadioGroup.Root as never, { defaultValue: slug(values[0] ?? "") }, () => [
          h(Stack, { gap: "sm" }, () =>
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
