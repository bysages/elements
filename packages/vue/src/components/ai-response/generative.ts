import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Response } from "./index";

/** Rendered assistant prose with tables and code. */
export default defineEntry({
  AiResponse: {
    props: z.object({ content: z.string() }),
    description: "Rendered assistant prose with tables and code.",
    component: ({ props }) => h(Response as never, { content: props.content } as never),
  },
});
