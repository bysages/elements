import { defineFamily } from "../../internal/family";
import FloatButtonRoot from "./FloatButton.svelte";
import FloatButtonFacade from "./FloatButtonFacade.svelte";
import FloatButtonItem from "./FloatButtonItem.svelte";
import FloatButtonTrigger from "./FloatButtonTrigger.svelte";

/** A floating action and its fanned-out alternatives — FAB and speed
 * dial in one family. Root, Trigger, Item. */
export const FloatButton: typeof FloatButtonFacade & {
  Root: typeof FloatButtonRoot;
  Trigger: typeof FloatButtonTrigger;
  Item: typeof FloatButtonItem;
} = defineFamily(FloatButtonFacade, {
  Root: FloatButtonRoot,
  Trigger: FloatButtonTrigger,
  Item: FloatButtonItem,
});

export { FLOAT_BUTTON_KEY } from "./context";
export type { FloatButtonContext } from "./context";
export type {
  FloatButtonItemProps,
  FloatButtonFacadeProps,
  FloatButtonPlacement,
  FloatButtonProps,
  FloatButtonSize,
  FloatButtonTriggerProps,
} from "./props";
