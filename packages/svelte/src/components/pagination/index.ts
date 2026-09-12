import { Pagination as ArkPagination } from "@ark-ui/svelte/pagination";
import { injectComponentStyle } from "@bysages/core";

/**
 * Pagination — paged navigation.
 *
 * Parts: Root, Item (page seals), Ellipsis, PrevTrigger, NextTrigger,
 * FirstTrigger, LastTrigger. Items carry data-selected.
 */
export const Pagination = ArkPagination;

injectComponentStyle("pagination");
