import type { Meta } from "@storybook/vue3-vite";
import { h, reactive } from "vue";

import { withState } from "../with-state.js";
import { Pagination } from "./index.js";

const meta: Meta = { title: "Components / Pagination" };
export default meta;

type Pages = Array<{ type: string; value?: number }>;

function chevron(direction: "left" | "right" | "first" | "last") {
  const paths = {
    left: "m15 18-6-6 6-6",
    right: "m9 18 6-6-6-6",
    first: "m11 18-6-6 6-6m8 6-6-6-6 6",
    last: "m13 18 6-6-6-6M5 12l6-6 6 6",
  } as const;
  return h(
    "svg",
    {
      width: 14,
      height: 14,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 1.75,
      "aria-hidden": true,
    },
    [h("path", { d: paths[direction] })],
  );
}

/** The page marks render from the machine: numbers, gaps as ellipses,
 * the current page in ink. */
function pages() {
  return h(Pagination.Context, null, {
    default: (pagination: { pages: Pages }) =>
      pagination.pages.map((page, index) =>
        page.type === "page"
          ? h(Pagination.Item, { key: page.value, value: page.value } as any, () => page.value)
          : h(Pagination.Ellipsis, { key: `e${index}`, index }, () => "…"),
      ),
  });
}

function bar(rootProps: any, edges = false) {
  return h(Pagination.Root, rootProps, () =>
    [
      edges && h(Pagination.FirstTrigger, { "aria-label": "First page" }, () => chevron("first")),
      h(Pagination.PrevTrigger, { "aria-label": "Previous page" }, () => chevron("left")),
      pages(),
      h(Pagination.NextTrigger, { "aria-label": "Next page" }, () => chevron("right")),
      edges && h(Pagination.LastTrigger, { "aria-label": "Last page" }, () => chevron("last")),
    ].filter(Boolean),
  );
}

/** Five hundred entries, ten to a page: the ladder of numbers with
 * ellipses where the rung count folds. */
export const Basic = {
  render: () => bar({ count: 5000, pageSize: 10, siblingCount: 2 }),
};

/** Edge triggers jump straight to the ends — no walking through
 * ellipses. */
export const WithEdges = {
  render: () => bar({ count: 5000, pageSize: 20, siblingCount: 2 }, true),
};

/** A wider neighborhood: siblingCount keeps more rungs visible before
 * the fold. */
export const Customized = {
  render: () =>
    bar({
      count: 5000,
      pageSize: 20,
      siblingCount: 3,
      translations: {
        nextTriggerLabel: "Next",
        prevTriggerLabel: "Prev",
        itemLabel: (details: { page: string }) => `Page ${details.page}`,
      } as any,
    }),
};

/** The page answers to the caller — the ladder only mirrors. */
export const Controlled = {
  render: () =>
    withState(() => {
      const state = reactive({ page: 1 });
      return () =>
        h("div", { style: { display: "grid", gap: "0.75rem", justifyItems: "start" } }, [
          h(
            "p",
            { style: { margin: 0, fontSize: "var(--bs-font-size-sm)" } },
            () => `Page ${state.page}`,
          ),
          bar({
            count: 5000,
            pageSize: 10,
            siblingCount: 2,
            page: state.page,
            onPageChange: (e: { page: number }) => (state.page = e.page),
          } as any),
        ]);
    }),
};

/** The page size lives in the same machine: one select re-cuts the
 * ladder. */
export const PageSizeControl = {
  render: () =>
    h(Pagination.Root, { count: 100, defaultPageSize: 10 } as any, () =>
      h(Pagination.Context, null, {
        default: (pagination: {
          pageSize: number;
          setPageSize: (size: number) => void;
          pages: Pages;
        }) => [
          h(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.75rem",
              },
            },
            () => [
              h("label", { style: { fontSize: "var(--bs-font-size-sm)" } }, () => "Items per page"),
              h(
                "select",
                {
                  onChange: (e: Event) =>
                    pagination.setPageSize(Number((e.target as HTMLSelectElement).value)),
                  value: pagination.pageSize,
                  style: {
                    border: "1px solid var(--bs-color-border)",
                    background: "var(--bs-color-surface-2)",
                    borderRadius: "var(--bs-radius-sm)",
                    padding: "0.25rem 0.375rem",
                    font: "inherit",
                    fontSize: "var(--bs-font-size-sm)",
                  },
                },
                [5, 10, 20].map((n) => h("option", { key: n, value: n }, n)),
              ),
            ],
          ),
          h("div", { style: { display: "flex", gap: "0.25rem" } }, () =>
            bar({ count: 100, defaultPageSize: pagination.pageSize }),
          ),
        ],
      }),
    ),
};

/** The range reads itself: which entries this page carries, of how
 * many. */
export const PageRange = {
  render: () =>
    h(Pagination.Root, { count: 120, pageSize: 10, siblingCount: 1 }, () => [
      h(Pagination.Context, null, {
        default: (pagination: { page: number; pageSize: number; count: number; pages: Pages }) =>
          h("div", { style: { display: "grid", gap: "0.5rem", justifyItems: "start" } }, [
            h(
              "p",
              {
                style: {
                  margin: 0,
                  fontSize: "var(--bs-font-size-sm)",
                  color: "var(--bs-color-text-secondary)",
                },
              },
              () => {
                const start = (pagination.page - 1) * pagination.pageSize + 1;
                const end = Math.min(pagination.page * pagination.pageSize, pagination.count);
                return `Entries ${start}–${end} of ${pagination.count}`;
              },
            ),
            h("div", { style: { display: "flex", gap: "0.25rem" } }, () => [
              h(Pagination.PrevTrigger, { "aria-label": "Previous page" }, () => chevron("left")),
              pages(),
              h(Pagination.NextTrigger, { "aria-label": "Next page" }, () => chevron("right")),
            ]),
          ]),
      }),
    ]),
};

const ledgers = Array.from({ length: 40 }, (_, i) => `Entry ${i + 1}`);

/** The page controls real content: the list below is sliced by the
 * machine, not mocked. */
export const DataSlicing = {
  render: () =>
    h(Pagination.Root, { count: ledgers.length, pageSize: 8, siblingCount: 1 }, () =>
      h(Pagination.Context, null, {
        default: (pagination: { page: number; pageSize: number; pages: Pages }) =>
          h("div", { style: { display: "grid", gap: "0.75rem", justifyItems: "start" } }, [
            h(
              "ul",
              { style: { margin: 0, paddingLeft: "1.25rem", fontSize: "var(--bs-font-size-sm)" } },
              () => {
                const start = (pagination.page - 1) * pagination.pageSize;
                return ledgers
                  .slice(start, start + pagination.pageSize)
                  .map((entry) => h("li", { key: entry }, entry));
              },
            ),
            h("div", { style: { display: "flex", gap: "0.25rem" } }, () => [
              h(Pagination.PrevTrigger, { "aria-label": "Previous page" }, () => chevron("left")),
              pages(),
              h(Pagination.NextTrigger, { "aria-label": "Next page" }, () => chevron("right")),
            ]),
          ]),
      }),
    ),
};
