import { Pagination as ArkPagination } from "@ark-ui/react/pagination";
import { injectComponentStyle } from "@bysages/core";
import type { ComponentProps } from "react";

type PaginationRootProps = ComponentProps<typeof ArkPagination.Root> & {
  /** One rung of the control-height ladder every page seal shares. */
  size?: "sm" | "md" | "lg";
};

function PaginationRoot({ size = "md", ...rest }: PaginationRootProps) {
  return <ArkPagination.Root {...rest} data-size={size} />;
}

/**
 * Pagination — paged navigation.
 *
 * Parts: Root, Item (page seals), Ellipsis, PrevTrigger, NextTrigger,
 * FirstTrigger, LastTrigger. Items carry data-selected.
 */
/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Pagination: Omit<typeof ArkPagination, "Root"> & { Root: typeof PaginationRoot } = {
  ...ArkPagination,
  Root: PaginationRoot,
};

injectComponentStyle("pagination");
