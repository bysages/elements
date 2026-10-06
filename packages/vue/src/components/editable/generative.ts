import { h } from "vue";
import { z } from "zod";

import { labelled } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { iconNode } from "../../internal/icon";
import { Editable } from "./index";

/** Text that turns into a field when activated, and back on commit. */
export default defineEntry({
  Editable: {
    props: z.object({
      label: z.string().optional(),
      value: z.string().optional(),
      placeholder: z.string().optional(),
    }),
    description: "Text that turns into a field when activated, and back on commit.",
    component: ({ props }) => {
      const icon = (d: string) => {
        const byPath: Record<string, ReturnType<typeof iconNode>> = {
          "M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z": iconNode("pencil"),
          "m5 12.5 5 5L19 7": iconNode("check"),
          "m6 6 12 12M18 6 6 18": iconNode("x"),
        };
        return byPath[d] ?? iconNode("pencil");
      };
      return labelled(
        props.label,
        h(
          Editable.Root as never,
          { placeholder: props.placeholder, defaultValue: props.value ?? "" },
          () => [
            h(Editable.Area, () => [h(Editable.Preview as never), h(Editable.Input as never)]),
            h(Editable.Control, () => [
              h(
                Editable.EditTrigger,
                { "aria-label": "Edit" },
                { default: () => icon("M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z") },
              ),
              h(
                Editable.SubmitTrigger,
                { "aria-label": "Submit" },
                { default: () => icon("m5 12.5 5 5L19 7") },
              ),
              h(
                Editable.CancelTrigger,
                { "aria-label": "Cancel" },
                { default: () => icon("m6 6 12 12M18 6 6 18") },
              ),
            ]),
          ],
        ),
      );
    },
  },
});
