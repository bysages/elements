import { h } from "vue";
import { z } from "zod";

import { defineEntry, slotted } from "../../generative/shared";
import { Input } from "../input";
import { InputGroup } from "./index";

/** Joins an input with leading or trailing addon text. */
export default defineEntry({
  InputGroup: {
    props: z.object({}),
    slots: ["default"],
    description: "Joins an input with leading or trailing addon text.",
    component: ({ children }) =>
      h(InputGroup, () => [
        h(InputGroup.Addon, () => "https://"),
        h(Input, { placeholder: "example.com" }),
        ...slotted(children),
      ]),
  },
});
