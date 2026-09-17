import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

/** The upload's state on the wire. */
export type AttachmentStatus = "uploading" | "ready" | "error";

export interface AttachmentProps extends HTMLAttributes<HTMLSpanElement> {
  /** The file's name — it picks the glyph by extension. */
  name: string;
  /** The file's size in bytes, when known — rendered human. */
  size?: number;
  status?: AttachmentStatus;
  /** Taken when the reader takes the attachment back off. */
  onRemove?: () => void;
}

export interface AttachmentsProps extends HTMLAttributes<HTMLSpanElement> {
  children?: Snippet;
}
