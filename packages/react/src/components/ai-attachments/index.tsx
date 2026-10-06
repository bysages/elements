import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

import { withSelfRoot } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { formatMessage, useComponentMessages } from "../../internal/messages";

const imageIcon = iconNode("image", { width: 16, height: 16 });
const fileIcon = iconNode("file", { width: 16, height: 16 });
const removeIcon = iconNode("x", { width: 12, height: 12 });

const IMAGE_EXTS = ["png", "jpg", "jpeg", "gif", "webp", "svg", "avif", "bmp", "ico"];

const isImage = (name: string) => IMAGE_EXTS.includes(name.split(".").pop()?.toLowerCase() ?? "");

const humanSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  const units = ["KB", "MB", "GB"];
  let value = bytes;
  let unit = -1;
  do {
    value /= 1024;
    unit += 1;
  } while (value >= 1024 && unit < units.length - 1);
  return `${value.toFixed(1)} ${units[unit]}`;
};

/** One file riding the prompt: its icon by extension, its name and
 * human size, and a quiet way to take it back off. Uploading reads as
 * a dashed ghost, error as danger ink. */
export interface AttachmentProps extends HTMLAttributes<HTMLSpanElement> {
  /** The file's name — it picks the icon by extension. */
  name: string;
  /** The file's size in bytes, when known — rendered human. */
  size?: number;
  /** The upload's state on the wire. */
  status?: "uploading" | "ready" | "error";
  onRemove?: () => void;
}

function AttachmentImpl({ name, size, status = "ready", onRemove, ...rest }: AttachmentProps) {
  injectComponentStyle("ai");
  const messages = useComponentMessages();
  return (
    <span {...rest} data-scope="ai" data-part="attachment" data-status={status}>
      {isImage(name) ? imageIcon : fileIcon}
      <span>{name}</span>
      {size !== undefined ? <span>{humanSize(size)}</span> : null}
      <button
        type="button"
        data-remove=""
        aria-label={formatMessage(messages.ai.removeAttachment, { name })}
        onClick={() => onRemove?.()}
      >
        {removeIcon}
      </button>
    </span>
  );
}

export const Attachment = withSelfRoot(AttachmentImpl);

/** The row the files ride in — a wrapping line of chips. */
function AttachmentsImpl({ children, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span {...rest} data-scope="ai" data-part="attachments">
      {children}
    </span>
  );
}

export const Attachments = withSelfRoot(AttachmentsImpl);
export { Attachment as AiAttachment, Attachments as AiAttachments };
