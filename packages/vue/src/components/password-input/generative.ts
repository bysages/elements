import { eye, eye_off } from "@bysages/icons";
import { h } from "vue";
import { z } from "zod";

import { labelled } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { glyphNode } from "../../internal/glyph";
import { PasswordInput } from "./index";

/** A secret field with a visibility toggle. */
export default defineEntry({
  PasswordInput: {
    props: z.object({ label: z.string().optional() }),
    description: "A secret field with a visibility toggle.",
    component: ({ props }) => {
      const eyeGlyph = (open: boolean) =>
        glyphNode(open ? eye : eye_off, { width: 16, height: 16 });
      return labelled(
        props.label,
        h(PasswordInput.Root as never, {}, () => [
          h(PasswordInput.Control, () => [
            h(PasswordInput.Input as never),
            h(PasswordInput.VisibilityTrigger, () =>
              h(PasswordInput.Indicator, null, {
                default: () => eyeGlyph(true),
                fallback: () => eyeGlyph(false),
              }),
            ),
          ]),
        ]),
      );
    },
  },
});
