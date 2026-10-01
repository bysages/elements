import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Bento } from "./index";

/** A bento lattice of unequal tiles that reads as one plate; children are tiles. */
export default defineEntry({
  Bento: {
    props: z.object({ columns: z.number().int().min(1).max(6).optional() }),
    slots: ["default"],
    description: "A bento lattice of unequal tiles that reads as one plate; children are tiles.",
    component: ({ props, children }) =>
      h(Bento.Root, { columns: props.columns ?? 3 }, () => slotted(children)),
  },
  BentoItem: {
    props: z.object({ span: z.number().int().optional(), rowSpan: z.number().int().optional() }),
    slots: ["default"],
    description: "One tile of a Bento lattice: span claims columns, rowSpan claims rows.",
    component: ({ props, children }) =>
      h(Bento.Cell, { span: props.span ?? 1 }, () => slotted(children)),
  },
});
