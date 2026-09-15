import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface EmptyProps extends HTMLAttributes<HTMLDivElement> {
  children?: Snippet;
}

export interface EmptyTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: Snippet;
}

export interface EmptyDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: Snippet;
}

export interface EmptyPartProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}
