import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Calendar } from "./index";

/** A standing month grid for picking or showing dates. */
export default defineEntry({
  Calendar: {
    props: z.object({}),
    description: "A standing month grid for picking or showing dates.",
    component: () => h(Calendar as never, { style: { maxInlineSize: "20rem" } } as never),
  },
});
