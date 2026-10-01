import { createComponent, type JSX } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { Checkbox } from "./index";

/** One independent box with its label. */
export default defineEntry({
  Checkbox: {
    ...faces.Checkbox,
    component: ({ props }) => {
      const mark: JSX.Element = (
        <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path
            d="M4 8.5l2.5 2.5L12 5.5"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      );
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
