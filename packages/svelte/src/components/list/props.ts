import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface ListProps extends HTMLAttributes<HTMLUListElement> {
  /** One hairline between rows. */
  bordered?: boolean;
  /** Every row answers the pointer with a wash. */
  hoverable?: boolean;
  children?: Snippet;
}

export interface ListItemProps extends HTMLAttributes<HTMLLIElement> {
  children?: Snippet;
}

export interface ListLeadingProps extends HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
}

export interface ListActionsProps extends HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
}

export interface ListContentProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  /** The row's words. */
  title?: Snippet;
  /** The quiet echo beneath the title. */
  description?: Snippet;
  /** Anything else the row holds, after title and description. */
  children?: Snippet;
}
