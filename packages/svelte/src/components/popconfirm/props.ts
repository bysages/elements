import type { Snippet } from "svelte";

import type { FloatingPortalTarget } from "../../internal/floating";

export interface PopconfirmProps {
  /** The question the reader is answering. */
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  /** The trigger — give it a single element (wrap a group in a span
   * otherwise). */
  /** After hydration, portal the confirmation vessel to body (`true`) or a CSS selector. */
  portal?: FloatingPortalTarget;
  children?: Snippet;
}
