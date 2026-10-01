import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Affix } from "./index";

/** Pins its child to an edge once the page scrolls past. */
export default defineEntry({
  Affix: {
    props: z.object({ offsetTop: z.number().optional() }),
    slots: ["default"],
    description: "Pins its child to an edge once the page scrolls past.",
    component: ({ props, children }) =>
      h(Affix, { offsetTop: (props.offsetTop ?? 0) + "px" }, () => slotted(children)),
  },
});
