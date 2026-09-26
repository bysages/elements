import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type FloatButtonPlacement = "bottom-end" | "bottom-start" | "top-end" | "top-start";

export type FloatButtonSize = "sm" | "md" | "lg";

export interface FloatButtonProps extends HTMLAttributes<HTMLDivElement> {
  /** Controlled openness — `bind:open` receives every flip; leave it
   * unbound and the group holds its own state. */
  open?: boolean;
  /** Which corner the group moors at. */
  placement?: FloatButtonPlacement;
  /** One rung of the button ladder for the whole group. */
  size?: FloatButtonSize;
  children?: Snippet;
}

export interface FloatButtonTriggerProps {
  /** The accessible name; the control is icon-only. */
  label?: string;
  children?: Snippet;
}

export interface FloatButtonItemProps {
  /** The action's name: the button's accessible name and the
   * annotation surfaced beside it while the group is open. */
  label: string;
  disabled?: boolean;
  /** Fired when the item's action is chosen — the fan folds right
   * after. */
  onclick?: () => void;
  children?: Snippet;
}
