import { h } from "vue";
import { z } from "zod";

import { slug } from "../../generative/shared";
import { defineEntry } from "../../generative/shared";
import { Toc } from "./index";

/** A table of contents rail; items link down the page. */
export default defineEntry({
  Toc: {
    props: z.object({ items: z.array(z.string()).optional() }),
    description: "A table of contents rail; items link down the page.",
    component: ({ props }) =>
      h(Toc, {
        title: "On this page",
        items: (props.items ?? ["Overview", "Tokens", "Lighting"]).map((label: string) => ({
          value: slug(label),
          label,
          depth: 1,
        })),
      }),
  },
});
