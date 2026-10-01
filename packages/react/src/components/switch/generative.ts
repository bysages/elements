import { createElement, type ReactNode } from "react";

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
      return createElement(
        Switch.Root,
        {
          checked: checked ?? false,
          onCheckedChange: (details: { checked: boolean }) => setChecked(details.checked),
        },
        [
          createElement(Switch.Control, null, createElement(Switch.Thumb)),
          props.label != null
            ? (createElement(Switch.Label, null, props.label!) as ReactNode)
            : null,
          createElement(Switch.HiddenInput),
        ],
      );
    },
  },
});
