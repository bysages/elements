import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { iconNode } from "../../internal/icon";
import { Clipboard } from "./index";

/** Copies a value at a click and confirms. */
export default defineEntry({
  Clipboard: {
    props: z.object({ value: z.string().optional(), label: z.string().optional() }),
    description: "Copies a value at a click and confirms.",
    component: ({ props }) => {
      const copyIcon = () => iconNode("copy", { width: 16, height: 16 });
      const checkIcon = () => iconNode("check", { width: 16, height: 16 });
      return h(
        Clipboard.Root as never,
        { defaultValue: props.value ?? "https://elements.bysages.com" },
        () => [
          props.label != null ? h(Clipboard.Label, () => props.label!) : null,
          h(Clipboard.Control, () => [
            h(Clipboard.ValueText as never),
            h(Clipboard.Trigger, () =>
              h(Clipboard.Indicator, null, {
                default: () => copyIcon(),
                copied: () => checkIcon(),
              }),
            ),
          ]),
        ],
      );
    },
  },
});
