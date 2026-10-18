import { h } from "vue";

import { faces } from "../../generative/faces";
import { defineEntry } from "../../generative/shared";
import { FloatButton } from "./index";

type FacadeAction = { label: string; icon?: string; disabled?: boolean };

/** A floating action cluster: the trigger and named actions fan from one corner. */
export default defineEntry({
  FloatButton: {
    ...faces.FloatButton,
    component: ({ props }) => {
      const actions: FacadeAction[] = Array.isArray(props.actions)
        ? props.actions
        : [{ label: "Edit" }];

      return h(
        FloatButton as never,
        {
          ...props,
          actions: actions.map((action) => ({ ...action, icon: action.icon ?? "pencil" })),
          defaultOpen: true,
        } as never,
      );
    },
  },
});
