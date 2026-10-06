import { h } from "vue";
import { z } from "zod";

import { labelled } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { iconNode } from "../../internal/icon";
import { PasswordInput } from "./index";

/** A secret field with a visibility toggle. */
export default defineEntry({
  PasswordInput: {
    props: z.object({ label: z.string().optional() }),
    description: "A secret field with a visibility toggle.",
    component: ({ props }) => {
      const eyeIcon = (open: boolean) =>
        iconNode(open ? "eye" : "eye-off", { width: 16, height: 16 });
      return labelled(
        props.label,
        h(PasswordInput.Root as never, {}, () => [
          h(PasswordInput.Control, () => [
            h(PasswordInput.Input as never),
            h(PasswordInput.VisibilityTrigger, () =>
              h(PasswordInput.Indicator, null, {
                default: () => eyeIcon(true),
                fallback: () => eyeIcon(false),
              }),
            ),
          ]),
        ]),
      );
    },
  },
});
