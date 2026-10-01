import { h } from "vue";
import { z } from "zod";

import { labelled } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { PasswordInput } from "./index";

/** A secret field with a visibility toggle. */
export default defineEntry({
  PasswordInput: {
    props: z.object({ label: z.string().optional() }),
    description: "A secret field with a visibility toggle.",
    component: ({ props }) => {
      const eye = (open: boolean) =>
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
            h("path", { d: "M2 12s3.5-6 10-6 10 6 10 6-3.5 6-10 6-10-6-10-6Z" }),
            h("circle", { cx: 12, cy: 12, r: 3 }),
            ...(open ? [] : [h("path", { d: "M4 4l16 16" })]),
          ],
        );
      return labelled(
        props.label,
        h(PasswordInput.Root as never, {}, () => [
          h(PasswordInput.Control, () => [
            h(PasswordInput.Input as never),
            h(PasswordInput.VisibilityTrigger, () =>
              h(PasswordInput.Indicator, null, {
                default: () => eye(true),
                fallback: () => eye(false),
              }),
            ),
          ]),
        ]),
      );
    },
  },
});
