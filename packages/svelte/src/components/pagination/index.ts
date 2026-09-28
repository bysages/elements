/**
 * Pagination — paged navigation.
 *
 * Parts: Root, Item (page seals), Ellipsis, PrevTrigger, NextTrigger,
 * FirstTrigger, LastTrigger. Items carry data-selected.
 */
import { Pagination as ArkPagination } from "@ark-ui/svelte/pagination";

import PaginationRoot from "./PaginationRoot.svelte";

/* Ark's namespace is frozen — spread copies the members so Root can be
 * the sized wrapper while the rest stay Ark's own parts. */
export const Pagination: Omit<typeof ArkPagination, "Root"> & { Root: typeof PaginationRoot } = {
  ...ArkPagination,
  Root: PaginationRoot,
};
