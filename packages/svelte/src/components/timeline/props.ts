import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface TimelineProps extends HTMLAttributes<HTMLOListElement> {
  children?: Snippet;
}

export interface TimelineItemProps extends HTMLAttributes<HTMLLIElement> {
  children?: Snippet;
}

export interface TimelineMarkerProps extends HTMLAttributes<HTMLSpanElement> {
  children?: Snippet;
}

export interface TimelineContentProps extends HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
}
