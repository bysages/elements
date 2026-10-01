import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Link } from "./index";

/** An underlined passage to somewhere else. */
export default defineEntry({
  Link: {
    props: z.object({ href: z.string().optional(), text: z.string().optional() }),
    slots: ["default"],
    description: "An underlined passage to somewhere else.",
    component: ({ props, children }) =>
      h(Link, { href: props.href ?? "#" }, () =>
        slotted(children).length ? slotted(children) : [props.text ?? props.href ?? "#"],
      ),
  },
});
