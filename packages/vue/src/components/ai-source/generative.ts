import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Source } from "./index";

/** A cited source row. */
export default defineEntry({
  AiSource: {
    props: z.object({ title: z.string().optional(), url: z.string().optional() }),
    description: "A cited source row.",
    component: ({ props }) =>
      h(
        Source as never,
        { href: props.url ?? "#" } as never,
        () => props.title ?? props.url ?? "Source",
      ),
  },
});
