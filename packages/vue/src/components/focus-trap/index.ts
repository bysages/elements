import { FocusTrap as ArkFocusTrap } from "@ark-ui/vue/focus-trap";

import { withSelfRoot } from "../../internal/family";

/** Trap focus within a subtree — for containers that live outside the
 * dialog machine but still owe the keyboard a boundary. Headless, so the page owns every visual decision. */
export const FocusTrap = withSelfRoot(ArkFocusTrap);
export type { FocusTrapBaseProps, FocusTrapProps } from "@ark-ui/vue/focus-trap";
