import { Pagination as ArkPagination } from "@ark-ui/react/pagination";
import { injectComponentStyle } from "@bysages/core";
import type { CSSProperties } from "react";
import type { ComponentProps } from "react";

import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

type PaginationRootProps = ComponentProps<typeof ArkPagination.Root> & {
  /** One rung of the control-height ladder every page seal shares. */
  size?: "sm" | "md" | "lg";
};

function PaginationRoot(props: PaginationRootProps) {
  injectComponentStyle("pagination");
  const id = useElementId("pagination", props);
  const { size = "md", ...rest } = props;

  return <ArkPagination.Root {...rest} id={id} data-size={size} />;
}

/**
 * Pagination — paged navigation.
 *
 * Parts: Root, Item (page seals), Ellipsis, PrevTrigger, NextTrigger,
 * FirstTrigger, LastTrigger. Items carry data-selected.
 */

type PaginationFacadeProps = {
  value?: number;
  defaultValue?: number;
  count?: number;
  pageSize?: number;
  defaultPageSize?: number;
  siblingCount?: number;
  label?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
  style?: CSSProperties;
  onValueChange?: (page: number) => void;
};

const PaginationPrevTrigger = ArkPagination.PrevTrigger;
const PaginationNextTrigger = ArkPagination.NextTrigger;

/** The complete pagination bar behind one page: count and page size become
 * the visible ladder, with edge semantics left to anatomy. */
function PaginationFacade(props: PaginationFacadeProps) {
  const {
    value,
    defaultValue,
    count = 0,
    pageSize,
    defaultPageSize,
    siblingCount = 1,
    label,
    size = "md",
    className,
    style,
    onValueChange,
  } = props;

  return (
    <PaginationRoot
      size={size}
      aria-label={label}
      count={count}
      defaultPage={defaultValue}
      page={value}
      {...(pageSize === undefined ? {} : { pageSize })}
      {...(defaultPageSize === undefined ? {} : { defaultPageSize })}
      siblingCount={siblingCount}
      className={className}
      style={style}
      onPageChange={(event: { page: number }) => onValueChange?.(event.page)}
    >
      <PaginationPrevTrigger aria-label="Previous page">
        {iconNode("chevron-left", { width: 14, height: 14 })}
      </PaginationPrevTrigger>
      <ArkPagination.Context>
        {(pagination: { pages: Array<{ type: string; value?: number }> }) =>
          pagination.pages.map((page, index) =>
            page.type === "page" ? (
              <ArkPagination.Item key={page.value} type="page" value={page.value!}>
                {page.value}
              </ArkPagination.Item>
            ) : (
              <ArkPagination.Ellipsis key={`ellipsis-${index}`} index={index}>
                …
              </ArkPagination.Ellipsis>
            ),
          )
        }
      </ArkPagination.Context>
      <PaginationNextTrigger aria-label="Next page">
        {iconNode("chevron-right", { width: 14, height: 14 })}
      </PaginationNextTrigger>
    </PaginationRoot>
  );
}

export const Pagination: typeof PaginationFacade &
  Omit<typeof ArkPagination, "Root" | "PrevTrigger" | "NextTrigger"> & {
    Root: typeof PaginationRoot;
    PrevTrigger: typeof PaginationPrevTrigger;
    NextTrigger: typeof PaginationNextTrigger;
  } = Object.assign(PaginationFacade, {
  ...ArkPagination,
  Root: PaginationRoot,
  PrevTrigger: PaginationPrevTrigger,
  NextTrigger: PaginationNextTrigger,
}) as typeof PaginationFacade &
  Omit<typeof ArkPagination, "Root" | "PrevTrigger" | "NextTrigger"> & {
    Root: typeof PaginationRoot;
    PrevTrigger: typeof PaginationPrevTrigger;
    NextTrigger: typeof PaginationNextTrigger;
  };
