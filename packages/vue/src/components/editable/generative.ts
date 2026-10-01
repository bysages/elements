import { h } from "vue";
import { z } from "zod";

import { labelled } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
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
      const glyph = (d: string) =>
        h(
          "svg",
          { viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", "stroke-width": 2 },
          [h("path", { d, "stroke-linecap": "round", "stroke-linejoin": "round" })],
        );
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
                { default: () => glyph("M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z") },
              ),
              h(
                Editable.SubmitTrigger,
                { "aria-label": "Submit" },
                { default: () => glyph("m5 12.5 5 5L19 7") },
              ),
              h(
                Editable.CancelTrigger,
                { "aria-label": "Cancel" },
                { default: () => glyph("m6 6 12 12M18 6 6 18") },
              ),
            ]),
          ],
        ),
      );
    },
  },
});
