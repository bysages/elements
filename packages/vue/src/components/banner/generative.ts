import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Banner } from "./index";

/** A full-width notice that sits above the page. */
export default defineEntry({
  Banner: {
    props: z.object({
      status: z.string().optional(),
      title: z.string().optional(),
      message: z.string().optional(),
    }),
    description: "A full-width notice that sits above the page.",
    component: ({ props }) =>
      h(Banner.Root as never, { status: props.status } as never, () => [
        h(Banner.Body, () => [
          props.title != null ? h(Banner.Title, () => props.title!) : null,
          props.message != null ? h(Banner.Description, () => props.message!) : null,
        ]),
        h(Banner.Close, () => "x"),
      ]),
  },
});
