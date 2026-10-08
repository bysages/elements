import { createElement } from "react";

import { faces } from "../../generative/faces.generated";
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
        createElement(
          RadioGroup.Root,
          { defaultValue: slug(values[0] ?? "") },
          createElement(
            Stack,
            { gap: "sm" },
            values.map((value: string) =>
              createElement(
                RadioGroup.Item,
                { key: value, value },
                createElement(RadioGroup.ItemControl),
                createElement(RadioGroup.ItemText, null, value),
                createElement(RadioGroup.ItemHiddenInput),
              ),
            ),
          ),
        ),
      );
    },
  },
});
