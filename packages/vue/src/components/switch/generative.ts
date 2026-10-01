import { h } from "vue";
import { z } from "zod";

import { useBound } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Switch } from "./index";

/** An instant on/off; label names what it switches. */
export default defineEntry({
  Switch: {
    props: z.object({ label: z.string().optional(), checked: z.boolean().optional() }),
    description: "An instant on/off; label names what it switches.",
    component: ({ props, bindings }) => {
      const [checked, setChecked] = useBound<boolean>(props.checked, bindings?.checked);
      return h(
        Switch.Root,
        {
          checked: checked ?? false,
          "onUpdate:checked": (next: boolean) => setChecked(next),
        },
        () => [
          h(Switch.Control, () => h(Switch.Thumb)),
          props.label != null ? h(Switch.Label, () => props.label!) : null,
          h(Switch.HiddenInput as never),
        ],
      );
    },
  },
});
