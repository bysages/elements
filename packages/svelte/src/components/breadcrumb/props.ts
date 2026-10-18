import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface BreadcrumbProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}

export interface BreadcrumbListProps extends HTMLAttributes<HTMLOListElement> {
  children?: Snippet;
}

export interface BreadcrumbItemProps extends HTMLAttributes<HTMLLIElement> {
  children?: Snippet;
}

export interface BreadcrumbLinkProps extends HTMLAttributes<HTMLAnchorElement> {
  children?: Snippet;
}

export interface BreadcrumbCurrentProps extends HTMLAttributes<HTMLSpanElement> {
  children?: Snippet;
}

export interface BreadcrumbSeparatorProps extends HTMLAttributes<HTMLSpanElement> {
  children?: Snippet;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbFacadeProps extends HTMLAttributes<HTMLElement> {
  /** The trail, in reading order; the last item is the current page. */
  items: ReadonlyArray<string | BreadcrumbItem>;
  /** The nav's accessible name; the locale supplies a default. */
  label?: string;
}
