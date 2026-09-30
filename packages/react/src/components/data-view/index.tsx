import { injectComponentStyle } from "@bysages/core";
import { type HTMLAttributes, type ReactNode, useState } from "react";

import { Pagination } from "../pagination";

export interface DataViewProps extends HTMLAttributes<HTMLDivElement> {
  items: unknown[];
  /** Ledger rows or a lattice of cards. */
  layout?: "list" | "grid";
  /** Records per page; leave unset to show everything at once. */
  pageSize?: number;
  /** Renders one record; the view lays the returned nodes out. */
  renderItem?: (item: unknown, index: number) => ReactNode;
  header?: ReactNode;
}

/** One vessel, two layouts: the caller renders each record through
 * renderItem, the view lays the records out as a ledger or a lattice
 * and — when a page size is given — pages them with the pagination
 * family's own parts rather than a second implementation. */
export function DataView({
  items,
  layout = "list",
  pageSize,
  renderItem,
  header,
  ...rest
}: DataViewProps) {
  injectComponentStyle("data-view");
  const [page, setPage] = useState(1);
  const pageCount = pageSize ? Math.max(1, Math.ceil(items.length / pageSize)) : 1;
  const visible = pageSize ? items.slice((page - 1) * pageSize, page * pageSize) : items;
  return (
    <div {...rest} data-scope="data-view" data-part="root">
      {header}
      <div data-scope="data-view" data-part="content" data-layout={layout}>
        {visible.map((item, index) => (
          <div key={index} data-scope="data-view" data-part="cell">
            {renderItem?.(item, index)}
          </div>
        ))}
      </div>
      {pageSize && pageCount > 1 ? (
        <div data-scope="data-view" data-part="pager">
          <Pagination.Root
            count={items.length}
            pageSize={pageSize}
            page={page}
            siblingCount={1}
            onPageChange={(details) => setPage(details.page)}
          >
            <Pagination.PrevTrigger aria-label="Previous page">‹</Pagination.PrevTrigger>
            <Pagination.Context>
              {(pagination) =>
                pagination.pages.map((entry, index) =>
                  entry.type === "ellipsis" ? (
                    <Pagination.Ellipsis key={`e${index}`} index={index}>
                      …
                    </Pagination.Ellipsis>
                  ) : (
                    <Pagination.Item key={entry.value} type="page" value={entry.value}>
                      {entry.value}
                    </Pagination.Item>
                  ),
                )
              }
            </Pagination.Context>
            <Pagination.NextTrigger aria-label="Next page">›</Pagination.NextTrigger>
          </Pagination.Root>
        </div>
      ) : null}
    </div>
  );
}
