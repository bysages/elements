import { h } from "vue";
import { z } from "zod";

import { defineEntry } from "../../generative/shared";
import { Pagination } from "./index";

/** Page numbers with previous and next. */
export default defineEntry({
  Pagination: {
    props: z.object({ total: z.number().optional(), page: z.number().optional() }),
    description: "Page numbers with previous and next.",
    component: ({ props }) =>
      h(Pagination, {
        count: props.total ?? 100,
        pageSize: 10,
        defaultValue: props.page ?? 1,
        siblingCount: 1,
      }),
  },
});
