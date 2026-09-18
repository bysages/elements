import { injectComponentStyle } from "@bysages/core";

import ListRoot from "./List.svelte";
import ListActions from "./ListActions.svelte";
import ListContent from "./ListContent.svelte";
import ListItem from "./ListItem.svelte";
import ListLeading from "./ListLeading.svelte";

/** A ledger of rows: Root is the list, Item one row, Leading the mark
 * before the words, Content the title and its quiet echo, Actions the
 * way out. The bordered variant draws the hairlines; the hoverable
 * variant gives every row the wash — and any row the caller makes
 * clickable (role="button") answers the pointer on its own. */
export const List = Object.assign(ListRoot, {
  Root: ListRoot,
  Item: ListItem,
  Leading: ListLeading,
  Content: ListContent,
  Actions: ListActions,
});

export type {
  ListProps,
  ListItemProps,
  ListLeadingProps,
  ListContentProps,
  ListActionsProps,
} from "./props";

injectComponentStyle("list");
