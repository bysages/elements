import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

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
