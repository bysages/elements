import { injectComponentStyle } from "@bysages/core";

import FloatButtonRoot from "./FloatButton.svelte";
import FloatButtonItem from "./FloatButtonItem.svelte";
import FloatButtonTrigger from "./FloatButtonTrigger.svelte";

/** A floating action and its fanned-out alternatives — FAB and speed
 * dial in one family. Root, Trigger, Item. */
export const FloatButton = Object.assign(FloatButtonRoot, {
  Root: FloatButtonRoot,
  Trigger: FloatButtonTrigger,
  Item: FloatButtonItem,
});

export type { FloatButtonContext } from "./context";
export { FLOAT_BUTTON_KEY } from "./context";
export type {
  FloatButtonItemProps,
  FloatButtonPlacement,
  FloatButtonProps,
  FloatButtonTriggerProps,
} from "./props";

injectComponentStyle("float-button");
