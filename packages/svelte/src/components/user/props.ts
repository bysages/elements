import type { HTMLAttributes } from "svelte/elements";

export interface UserProps extends HTMLAttributes<HTMLDivElement> {
  /** The person's name — the loud line. */
  name: string;
  /** The quiet echo beneath the name: a role, a title, an address. */
  description?: string;
  /** Seal diameter: one rung of the Avatar's own ladder. */
  size?: "sm" | "md" | "lg";
  src?: string;
  shape?: "circle" | "square";
  children?: import("svelte").Snippet;
}
