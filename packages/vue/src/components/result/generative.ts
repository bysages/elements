import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Result } from "./index";

/** An outcome page fragment: icon, verdict, and the next actions. */
export default defineEntry({
  Result: {
    props: z.object({
      status: z.enum(["success", "warning", "danger", "info"]).optional(),
      title: z.string().optional(),
      description: z.string().optional(),
    }),
    description: "An outcome page fragment: icon, verdict, and the next actions.",
    component: ({ props, children }) =>
      h(Result.Root, { status: props.status ?? "info" }, () => [
        h(Result.Icon),
        props.title != null ? h(Result.Title, () => props.title!) : null,
        props.description != null ? h(Result.Description, () => props.description!) : null,
        slotted(children).length ? h(Result.Extra, () => slotted(children)) : null,
      ]),
  },
});
