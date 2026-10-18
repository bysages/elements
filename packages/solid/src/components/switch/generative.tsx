import { createComponent } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { useBound } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Switch } from "./index";

/** An instant on/off; label names what it switches. */
export default defineEntry({
  Switch: {
    ...faces.Switch,
    component: ({ props, bindings }) => {
      const [checked, setChecked] = useBound<boolean>(props.checked, bindings?.checked);
      return createComponent(Switch, {
        get checked() {
          return checked ?? false;
        },
        get label() {
          return props.label;
        },
        get disabled() {
          return props.disabled;
        },
        onCheckedChange: (next: boolean) => setChecked(next),
      });
    },
  },
});
