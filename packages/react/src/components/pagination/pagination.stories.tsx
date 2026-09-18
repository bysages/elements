import type { Meta } from "@storybook/react-vite";
import { useState } from "react";

import { Pagination } from ".";

const meta: Meta = { title: "Components/Navigation/Pagination" };
export default meta;

type Pages = Array<{ type: string; value?: number }>;

function chevron(direction: "left" | "right" | "first" | "last") {
  const paths = {
    left: "m15 18-6-6 6-6",
    right: "m9 18 6-6-6-6",
    first: "m11 18-6-6 6-6m8 6-6-6-6 6",
    last: "m13 18 6-6-6-6M5 12l6-6 6 6",
  } as const;
  return (
    <svg
      width={14}
      height={14}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      aria-hidden="true"
    >
      <path d={paths[direction]} />
    </svg>
  );
}

/** The page marks render from the machine: numbers, gaps as ellipses,
 * the current page in ink. */
function pages() {
  return (
    <Pagination.Context>
      {(pagination: { pages: Pages }) =>
        pagination.pages.map((page, index) =>
          page.type === "page" ? (
            <Pagination.Item key={page.value} type="page" value={page.value!}>
              {page.value}
            </Pagination.Item>
          ) : (
            <Pagination.Ellipsis key={`e${index}`} index={index}>
              …
            </Pagination.Ellipsis>
          ),
        )
      }
    </Pagination.Context>
  );
}

function bar(rootProps: any, edges = false) {
  return (
    <Pagination.Root {...rootProps}>
      {edges && (
        <Pagination.FirstTrigger aria-label="First page">
          {chevron("first")}
        </Pagination.FirstTrigger>
      )}
      <Pagination.PrevTrigger aria-label="Previous page">{chevron("left")}</Pagination.PrevTrigger>
      {pages()}
      <Pagination.NextTrigger aria-label="Next page">{chevron("right")}</Pagination.NextTrigger>
      {edges && (
        <Pagination.LastTrigger aria-label="Last page">{chevron("last")}</Pagination.LastTrigger>
      )}
    </Pagination.Root>
  );
}

/** Five hundred entries, ten to a page: the ladder of numbers with
 * ellipses where the rung count folds. */
export const Basic = {
  args: {
    count: 5000,
    pageSize: 10,
    siblingCount: 2,
  },
  render: (args: any) => bar(args),
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
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
        <p style={{ margin: 0, fontSize: "var(--bs-font-size-sm)" }}>Page {page}</p>
        {bar({
          count: 5000,
          pageSize: 10,
          siblingCount: 2,
          page,
          onPageChange: (e: { page: number }) => setPage(e.page),
        } as any)}
      </div>
    );
  },
};

/** The page size lives in the same machine: one select re-cuts the
 * ladder. */
export const PageSizeControl = {
  render: () => (
    <Pagination.Root count={100} defaultPageSize={10}>
      <Pagination.Context>
        {(pagination: { pageSize: number; setPageSize: (size: number) => void; pages: Pages }) => (
          <>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                marginBottom: "0.75rem",
              }}
            >
              <label style={{ fontSize: "var(--bs-font-size-sm)" }}>Items per page</label>
              <select
                onChange={(e) => pagination.setPageSize(Number(e.target.value))}
                value={pagination.pageSize}
                style={{
                  border: "1px solid var(--bs-color-border)",
                  background: "var(--bs-color-surface-2)",
                  borderRadius: "var(--bs-radius-sm)",
                  padding: "0.25rem 0.375rem",
                  font: "inherit",
                  fontSize: "var(--bs-font-size-sm)",
                }}
              >
                {[5, 10, 20].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
            </div>
            <div style={{ display: "flex", gap: "0.25rem" }}>
              {bar({ count: 100, defaultPageSize: pagination.pageSize })}
            </div>
          </>
        )}
      </Pagination.Context>
    </Pagination.Root>
  ),
};

/** The range reads itself: which entries this page carries, of how
 * many. */
export const PageRange = {
  render: () => (
    <Pagination.Root count={120} pageSize={10} siblingCount={1}>
      <Pagination.Context>
        {(pagination: { page: number; pageSize: number; count: number; pages: Pages }) => (
          <div style={{ display: "grid", gap: "0.5rem", justifyItems: "start" }}>
            <p
              style={{
                margin: 0,
                fontSize: "var(--bs-font-size-sm)",
                color: "var(--bs-color-text-secondary)",
              }}
            >
              {(() => {
                const start = (pagination.page - 1) * pagination.pageSize + 1;
                const end = Math.min(pagination.page * pagination.pageSize, pagination.count);
                return `Entries ${start}–${end} of ${pagination.count}`;
              })()}
            </p>
            <div style={{ display: "flex", gap: "0.25rem" }}>
              <Pagination.PrevTrigger aria-label="Previous page">
                {chevron("left")}
              </Pagination.PrevTrigger>
              {pages()}
              <Pagination.NextTrigger aria-label="Next page">
                {chevron("right")}
              </Pagination.NextTrigger>
            </div>
          </div>
        )}
      </Pagination.Context>
    </Pagination.Root>
  ),
};

const ledgers = Array.from({ length: 40 }, (_, i) => `Entry ${i + 1}`);

/** The page controls real content: the list below is sliced by the
 * machine, not mocked. */
export const DataSlicing = {
  render: () => (
    <Pagination.Root count={ledgers.length} pageSize={8} siblingCount={1}>
      <Pagination.Context>
        {(pagination: { page: number; pageSize: number; pages: Pages }) => (
          <div style={{ display: "grid", gap: "0.75rem", justifyItems: "start" }}>
            <ul style={{ margin: 0, paddingLeft: "1.25rem", fontSize: "var(--bs-font-size-sm)" }}>
              {(() => {
                const start = (pagination.page - 1) * pagination.pageSize;
                return ledgers
                  .slice(start, start + pagination.pageSize)
                  .map((entry) => <li key={entry}>{entry}</li>);
              })()}
            </ul>
            <div style={{ display: "flex", gap: "0.25rem" }}>
              <Pagination.PrevTrigger aria-label="Previous page">
                {chevron("left")}
              </Pagination.PrevTrigger>
              {pages()}
              <Pagination.NextTrigger aria-label="Next page">
                {chevron("right")}
              </Pagination.NextTrigger>
            </div>
          </div>
        )}
      </Pagination.Context>
    </Pagination.Root>
  ),
};
