import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Transfer } from "./index";

/** Two panels with a shuttle between them: available on the left, chosen on the right. */
export default defineEntry({
  Transfer: {
    props: z.object({}),
    description:
      "Two panels with a shuttle between them: available on the left, chosen on the right.",
    component: () => {
      const data = ["Qinghua", "Celadon", "Zhusha", "Ochre", "Ultramarine"].map((name) => ({
        value: name,
        label: name,
      }));
      return h(Transfer as never, { data, modelValue: ["Qinghua"] } as never);
    },
  },
});
