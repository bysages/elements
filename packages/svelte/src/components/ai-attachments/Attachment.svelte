<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("ai");

import InternalIcon from "../../internal/InternalIcon.svelte";
import { formatMessage, useComponentMessages } from "../config-provider/messages";
import type { AttachmentProps } from "./props";

const IMAGE_EXTS = ["png", "jpg", "jpeg", "gif", "webp", "svg", "avif", "bmp", "ico"];

const isImage = (name: string) =>
  IMAGE_EXTS.includes(name.split(".").pop()?.toLowerCase() ?? "");

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

let { name, size, status = "ready", onRemove, "aria-label": label, ...rest }: AttachmentProps =
  $props();
const messages = useComponentMessages();
const removeLabel = $derived(label ?? formatMessage(messages().ai.removeAttachment, { name }));

</script>

<!-- One file riding the prompt: its icon by extension, its name and
human size, and a quiet way to take it back off. Uploading reads as a
dashed ghost, error as danger ink. -->
<span {...rest} data-scope="ai" data-part="attachment" data-status={status}>
  <InternalIcon name={isImage(name) ? "image" : "file"} />
  <span>{name}</span>
  {#if size !== undefined}
    <span>{humanSize(size)}</span>
  {/if}
  <button type="button" data-remove aria-label={removeLabel} onclick={() => onRemove?.()}>
    <InternalIcon name="x" size="sm" />
  </button>
</span>

