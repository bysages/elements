import { getContext } from "svelte";

/** The group's openness, shared from the mooring to its parts. */
export interface FloatButtonContext {
  /** Live openness — read through the getter, so parts re-render as it
   * flips. */
  readonly open: boolean;
  toggle: () => void;
  /** Folds the fan — an Item calls this once its action fires, the way
   * a speed dial closes after a choice. */
  close: () => void;
}

/** Context key for {@link FloatButtonContext}, exported so a custom
 * part can read the group's state. */
export const FLOAT_BUTTON_KEY: unique symbol = Symbol("bysages-float-button");

export function useFloatButton(): FloatButtonContext | null {
  return getContext<FloatButtonContext | null>(FLOAT_BUTTON_KEY) ?? null;
}
