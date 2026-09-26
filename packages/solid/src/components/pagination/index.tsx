import { Pagination as ArkPagination } from "@ark-ui/solid/pagination";
import type { PaginationRootProps as ArkPaginationRootProps } from "@ark-ui/solid/pagination";
import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";

/**
 * Pagination — paged navigation.
 *
 * Parts: Root, Item (page seals), Ellipsis, PrevTrigger, NextTrigger,
 * FirstTrigger, LastTrigger. Items carry data-selected.
 */

type PaginationOwnProps = {
  /** One rung of the control-height ladder every page seal shares. */
  size?: "sm" | "md" | "lg";
};

function PaginationRoot(props: ArkPaginationRootProps & PaginationOwnProps) {
  const [own, rest] = splitProps(props, ["size"]);
  return <ArkPagination.Root {...rest} data-size={own.size ?? "md"} />;
}

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Pagination: Omit<typeof ArkPagination, "Root"> & { Root: typeof PaginationRoot } = {
  ...ArkPagination,
  Root: PaginationRoot,
};

injectComponentStyle("pagination");
