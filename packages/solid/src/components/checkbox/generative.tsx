import { createComponent, type JSX } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { iconNode } from "../../internal/icon";
import { Checkbox } from "./index";

/** One independent box with its label. */
export default defineEntry({
  Checkbox: {
    ...faces.Checkbox,
    component: ({ props }) => {
      const mark: JSX.Element = iconNode("check");
      return createComponent(Checkbox.Root, {
        get defaultChecked() {
          return props.checked ?? false;
        },
        get disabled() {
          return props.disabled;
        },
        get children() {
          return [
            createComponent(Checkbox.Control, {
              get children() {
                return createComponent(Checkbox.Indicator, {
                  get children() {
                    return mark;
                  },
                });
              },
            }),
            createComponent(Checkbox.Label, {
              get children() {
                return props.label;
              },
            }),
            createComponent(Checkbox.HiddenInput, {}),
          ] as JSX.Element;
        },
      });
    },
  },
});
