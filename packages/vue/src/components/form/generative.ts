import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Form } from "./index";

/** The form vessel; children are Field vessels. Generated fields bind
 * through the spec's state, so it carries no engine of its own. */
export default defineEntry({
  Form: {
    props: z.object({}),
    slots: ["default"],
    description: "The form vessel; children are Field vessels.",
    component: ({ children }) => h(Form, {}, () => slotted(children)),
  },
});
