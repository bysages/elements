<script lang="ts">
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

let { name, size, status = "ready", onRemove, ...rest }: AttachmentProps = $props();
</script>

<!-- One file riding the prompt: its glyph by extension, its name and
human size, and a quiet way to take it back off. Uploading reads as a
dashed ghost, error as danger ink. -->
<span {...rest} data-scope="ai" data-part="attachment" data-status={status}>
  {#if isImage(name)}
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
  {:else}
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
  {/if}
  <span>{name}</span>
  {#if size !== undefined}
    <span>{humanSize(size)}</span>
  {/if}
  <button type="button" data-remove aria-label={`Remove ${name}`} onclick={() => onRemove?.()}>
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
  </button>
</span>
