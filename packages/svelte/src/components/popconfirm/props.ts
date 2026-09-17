import type { Snippet } from "svelte";

export interface PopconfirmProps {
  /** The question the reader is answering. */
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  /** The trigger — give it a single element (wrap a group in a span
   * otherwise). */
  children?: Snippet;
}
