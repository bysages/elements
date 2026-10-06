/** Trap focus within a subtree — for containers that live outside the
 * dialog machine but still owe the keyboard a boundary. Headless, like
 * the rest of Ark's utilities. */
import { FocusTrap as ArkFocusTrap } from "@ark-ui/solid/focus-trap";

import { withSelfRoot } from "../../internal/family";

export const FocusTrap = withSelfRoot(ArkFocusTrap);
export type { FocusTrapBaseProps, FocusTrapProps } from "@ark-ui/solid/focus-trap";
