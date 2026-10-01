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
      h(
        Pagination.Root as never,
        { count: props.total ?? 100, pageSize: 10, defaultPage: props.page ?? 1, siblingCount: 1 },
        () => [
          h(Pagination.PrevTrigger, { "aria-label": "Previous page" }, () => "<"),
          h(Pagination.Context, null, {
            default: (pagination: { pages: Array<{ type: string; value?: number }> }) =>
              pagination.pages.map((entry, index) =>
                entry.type === "ellipsis"
                  ? h(Pagination.Ellipsis, { key: "e" + index, index }, () => "...")
                  : h(
                      Pagination.Item,
                      { key: entry.value ?? 0, value: entry.value ?? 0, type: "page" },
                      () => entry.value,
                    ),
              ),
          }),
          h(Pagination.NextTrigger, { "aria-label": "Next page" }, () => ">"),
        ],
      ),
  },
});
