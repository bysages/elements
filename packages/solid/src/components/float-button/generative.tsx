import { createComponent } from "solid-js";

import { faces } from "../../generative/faces.generated";
import { defineEntry } from "../../generative/shared";
import { FloatButton } from "./index";

type FacadeAction = { label: string; icon?: string; disabled?: boolean };

/** A floating action cluster; named actions fan out from one corner. */
export default defineEntry({
  FloatButton: {
    ...faces.FloatButton,
    component: ({ props }) => {
      const actions: FacadeAction[] = Array.isArray(props.actions)
        ? props.actions
        : [{ label: "Edit" }];

      return createComponent(FloatButton, {
        get actions() {
          return actions.map((action) => ({ ...action, icon: action.icon ?? "pencil" }));
        },
        get defaultOpen() {
          return true;
        },
        get label() {
          return props.label;
        },
        get placement() {
          return props.placement;
        },
        get size() {
          return props.size;
        },
      });
    },
  },
});
