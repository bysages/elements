import { createComponent, type JSX } from "solid-js";

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
      return createComponent(Switch.Root, {
        get checked() {
          return checked ?? false;
        },
        get disabled() {
          return props.disabled;
        },
        onCheckedChange: (details: { checked: boolean }) => setChecked(details.checked),
        get children() {
          return [
            createComponent(Switch.Control, {
              get children() {
                return createComponent(Switch.Thumb, {});
              },
            }),
            createComponent(Switch.Label, {
              get children() {
                return props.label;
              },
            }),
            createComponent(Switch.HiddenInput, {}),
          ] as JSX.Element;
        },
      });
    },
  },
});
