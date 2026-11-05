import type { DialogContentProps as ArkDialogContentProps } from "@ark-ui/svelte/dialog";
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type DialogSize = "sm" | "md" | "lg" | "xl";

export interface DialogPartProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}

export type DialogContentProps = ArkDialogContentProps & {
  /** One content measure instead of ad-hoc max-width overrides. */
  size?: DialogSize;
};
