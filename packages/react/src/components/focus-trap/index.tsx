import { FocusTrap as ArkFocusTrap } from "@ark-ui/react/focus-trap";

import { withSelfRoot } from "../../internal/family";

/** Trap focus within a subtree — for containers that live outside the
 * dialog machine but still owe the keyboard a boundary. Headless, like
 * the rest of Ark's utilities. */
export type { FocusTrapBaseProps, FocusTrapProps } from "@ark-ui/react/focus-trap";
export const FocusTrap = withSelfRoot(ArkFocusTrap);
