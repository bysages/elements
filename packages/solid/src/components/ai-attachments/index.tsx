import { injectComponentStyle } from "@bysages/core";
import { splitProps } from "solid-js";
import type { JSX } from "solid-js";

function imageGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="square"
    >
      <rect x="2.5" y="3.5" width="11" height="9" />
      <path d="M2.5 10.5 6 7l3 3 2-1.5 2.5 2" />
      <circle cx="6" cy="6" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

function fileGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="square"
    >
      <path d="M4 2.5h5l3 3V13.5H4z" />
      <path d="M9 2.5v3h3" />
    </svg>
  );
}

function removeGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="12"
      height="12"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="square"
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

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

export type AttachmentStatus = "uploading" | "ready" | "error";

export interface AttachmentProps extends JSX.HTMLAttributes<HTMLSpanElement> {
  /** The file's name — it picks the glyph by extension. */
  name: string;
  /** The file's size in bytes, when known — rendered human. */
  size?: number;
  /** The upload's state on the wire. */
  status?: AttachmentStatus;
  onRemove?: () => void;
}

/** One file riding the prompt: its glyph by extension, its name and
 * human size, and a quiet way to take it back off. Uploading reads as
 * a dashed ghost, error as danger ink. */
export function Attachment(props: AttachmentProps) {
  const [own, rest] = splitProps(props, ["name", "size", "status", "onRemove"]);
  return (
    <span {...rest} data-scope="ai" data-part="attachment" data-status={own.status ?? "ready"}>
      {isImage(own.name) ? imageGlyph() : fileGlyph()}
      <span>{own.name}</span>
      {own.size !== undefined ? <span>{humanSize(own.size)}</span> : null}
      <button
        type="button"
        data-remove=""
        aria-label={`Remove ${own.name}`}
        onClick={() => own.onRemove?.()}
      >
        {removeGlyph()}
      </button>
    </span>
  );
}

/** The row the files ride in — a wrapping line of chips. */
export function Attachments(props: JSX.HTMLAttributes<HTMLSpanElement>) {
  return <span {...props} data-scope="ai" data-part="attachments" />;
}

injectComponentStyle("ai");

export { Attachment as AiAttachment, Attachments as AiAttachments };
