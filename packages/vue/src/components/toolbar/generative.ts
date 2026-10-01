import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Button } from "../button";
import { Toolbar } from "./index";

/** A workbench rail: holds the start and end tools as one announced group. */
export default defineEntry({
  Toolbar: {
    props: z.object({ label: z.string().optional() }),
    slots: ["default"],
    description: "A workbench rail: holds the start and end tools as one announced group.",
    component: ({ props, children }) =>
      h(Toolbar, { label: props.label ?? undefined }, () =>
        slotted(children).length ? slotted(children) : [h(Button, { size: "sm" }, () => "Tool")],
      ),
  },
});
