import type { PaginationRootProps as ArkPaginationRootProps } from "@ark-ui/svelte/pagination";

export type PaginationRootProps = ArkPaginationRootProps & {
  /** One rung of the control-height ladder every page seal shares. */
  size?: "sm" | "md" | "lg";
};
