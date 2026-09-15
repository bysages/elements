import type { HTMLAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface CardProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children?: Snippet;
}

export interface CardDescriptionProps extends HTMLAttributes<HTMLParagraphElement> {
  children?: Snippet;
}

export interface CardPartProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}
