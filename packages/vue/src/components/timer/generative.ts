import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Timer } from "./index";

/** A counting dial with start, pause and reset. */
export default defineEntry({
  Timer: {
    props: z.object({}),
    description: "A counting dial with start, pause and reset.",
    component: () => h(Timer, { targetMs: 90_000 }),
  },
});
