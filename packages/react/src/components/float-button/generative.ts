import { createElement } from "react";

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

      return createElement(FloatButton, {
        ...props,
        actions: actions.map((action) => ({ ...action, icon: action.icon ?? "pencil" })),
        defaultOpen: true,
      });
    },
  },
});
