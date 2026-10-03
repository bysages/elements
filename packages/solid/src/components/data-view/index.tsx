import { injectComponentStyle } from "@bysages/core";
import { For, Show, createSignal, createUniqueId, splitProps, type JSX } from "solid-js";

import { useComponentMessages } from "../config-provider/use-component-messages";
import { Pagination } from "../pagination";

export interface DataViewProps extends JSX.HTMLAttributes<HTMLDivElement> {
  items: unknown[];
  /** Ledger rows or a lattice of cards. */
  layout?: "list" | "grid";
  /** Records per page; leave unset to show everything at once. */
  pageSize?: number;
  /** Renders one record; the view lays the returned nodes out. */
  renderItem?: (item: unknown, index: number) => JSX.Element;
  header?: JSX.Element;
}

/** One vessel, two layouts: the caller renders each record through
 * renderItem, the view lays the records out as a ledger or a lattice
 * and — when a page size is given — pages them with the pagination
 * family's own parts rather than a second implementation. */
export function DataView(props: DataViewProps) {
  injectComponentStyle("data-view");
  const uid = createUniqueId();
  const [own, rest] = splitProps(props, ["items", "layout", "pageSize", "renderItem", "header"]);
  const messages = useComponentMessages();
  const [page, setPage] = createSignal(1);
  const pageCount = () =>
    own.pageSize ? Math.max(1, Math.ceil(own.items.length / own.pageSize)) : 1;
  const visible = () =>
    own.pageSize ? own.items.slice((page() - 1) * own.pageSize, page() * own.pageSize) : own.items;
  return (
    <div {...rest} data-scope="data-view" data-part="root" data-uid={uid}>
      {own.header}
      <div data-scope="data-view" data-part="content" data-layout={own.layout ?? "list"}>
        <For each={visible()}>
          {(item, index) => (
            <div data-scope="data-view" data-part="cell">
              {own.renderItem?.(item, index())}
            </div>
          )}
        </For>
      </div>
      <Show when={own.pageSize && pageCount() > 1}>
        <div data-scope="data-view" data-part="pager">
          <Pagination.Root
            count={own.items.length}
            pageSize={own.pageSize}
            page={page()}
            siblingCount={1}
            onPageChange={(details) => setPage(details.page)}
          >
            <Pagination.PrevTrigger aria-label={messages().pagination.previous}>
              ‹
            </Pagination.PrevTrigger>
            <Pagination.Context>
              {(pagination) => (
                <For each={pagination().pages}>
                  {(entry, index) =>
                    entry.type === "ellipsis" ? (
                      <Pagination.Ellipsis index={index()}>…</Pagination.Ellipsis>
                    ) : (
                      <Pagination.Item type="page" value={entry.value}>
                        {entry.value}
                      </Pagination.Item>
                    )
                  }
                </For>
              )}
            </Pagination.Context>
            <Pagination.NextTrigger aria-label={messages().pagination.next}>
              ›
            </Pagination.NextTrigger>
          </Pagination.Root>
        </div>
      </Show>
    </div>
  );
}
