import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Container } from "./index";

/** The typographic vessel: holds prose at a readable measure, centered. */
export default defineEntry({
  Container: {
    props: z.object({}),
    slots: ["default"],
    description: "The typographic vessel: holds prose at a readable measure, centered.",
    component: ({ children }) => h(Container, null, () => slotted(children)),
  },
});
