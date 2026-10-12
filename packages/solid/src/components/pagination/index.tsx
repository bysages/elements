import { Pagination as ArkPagination } from "@ark-ui/solid/pagination";
import type { PaginationRootProps as ArkPaginationRootProps } from "@ark-ui/solid/pagination";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, splitProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/**
 * Pagination — paged navigation.
 *
 * Parts: Root, Item (page seals), Ellipsis, PrevTrigger, NextTrigger,
 * FirstTrigger, LastTrigger. Items carry data-selected.
 */

type PaginationOwnProps = {
  /** One rung of the control-height ladder every page seal shares. */
  size?: "sm" | "md" | "lg";
  /** full is the page-seal ladder; simple keeps prev, the count, next. */
  variant?: "default" | "simple";
};

type PaginationRootProps = ArkPaginationRootProps & PaginationOwnProps;

function PaginationRoot(props: PaginationRootProps) {
  injectComponentStyle("pagination");

  const [own, rest] = splitProps(props, ["id", "size", "variant"]);
  const id = useElementId("pagination", () => props.id);
  return (
    <ArkPagination.Root
      {...rest}
      id={id()}
      data-size={own.size ?? "md"}
      data-variant={own.variant === "simple" ? own.variant : undefined}
    />
  );
}

export interface PaginationFacadeProps {
  value?: number;
  defaultValue?: number;
  count?: number;
  pageSize?: number;
  defaultPageSize?: number;
  siblingCount?: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  /** full is the page-seal ladder; simple keeps prev, the count, next. */
  variant?: "default" | "simple";
  class?: string;
  onValueChange?: (value: number) => void;
}

/** The complete pagination bar behind one page: count and page size become
 * the visible ladder, with edge semantics left to anatomy. */
function PaginationFacade(props: PaginationFacadeProps) {
  const variant = props.variant ?? "default";

  return (
    <PaginationRoot
      class={props.class}
      size={props.size ?? "md"}
      variant={variant}
      aria-label={props.label}
      count={props.count ?? 0}
      defaultPage={props.defaultValue}
      page={props.value}
      pageSize={props.pageSize}
      defaultPageSize={props.defaultPageSize}
      siblingCount={props.siblingCount ?? 1}
      onPageChange={(details: { page: number }) => props.onValueChange?.(details.page)}
    >
      <ArkPagination.PrevTrigger aria-label="Previous page">
        {iconNode("chevron-left", { width: "14", height: "14" })}
      </ArkPagination.PrevTrigger>
      {variant === "simple" ? (
        <ArkPagination.Context>
          {(pagination) => (
            <span data-scope="pagination" data-part="status">
              {pagination().page} / {pagination().totalPages}
            </span>
          )}
        </ArkPagination.Context>
      ) : (
        <ArkPagination.Context>
          {(pagination) => (
            <For each={pagination().pages}>
              {(page, index) =>
                page.type === "ellipsis" ? (
                  <ArkPagination.Ellipsis index={index()} />
                ) : (
                  <ArkPagination.Item type="page" value={page.value}>
                    {page.value}
                  </ArkPagination.Item>
                )
              }
            </For>
          )}
        </ArkPagination.Context>
      )}
      <ArkPagination.NextTrigger aria-label="Next page">
        {iconNode("chevron-right", { width: "14", height: "14" })}
      </ArkPagination.NextTrigger>
    </PaginationRoot>
  );
}

/* Ark's namespace is frozen — spread copies the members so the facade
 * coexists with the anatomy while Root stays the sized wrapper. */
export const Pagination: typeof PaginationFacade &
  Omit<typeof ArkPagination, "Root"> & { Root: typeof PaginationRoot } = defineFamily(
  PaginationFacade,
  {
    ...ArkPagination,
    Root: PaginationRoot,
  },
);

injectComponentStyle("pagination");
