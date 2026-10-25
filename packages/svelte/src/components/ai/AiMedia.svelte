<script lang="ts" generics="MESSAGE extends AiSdkMessage">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("ai");

import InternalIcon from "../../internal/InternalIcon.svelte";
import type { AiSdkMessage } from "./parts";
import type { AiMediaKind, AiMediaProps } from "./parts";

let { part, mediaType, url, filename, alt, ...rest }: AiMediaProps<MESSAGE> = $props();

const active = $derived.by((): AiSdkMediaPart<MESSAGE> | null => {
  if (part) return part;
  if (!mediaType || !url) return null;
  return {
    type: "file",
    mediaType,
    url,
    ...(filename ? { filename } : {}),
  };
});

const kind: AiMediaKind = $derived.by(() => {
  if (!active) return "file";
  const family = active.mediaType.split("/")[0];
  if (family === "image") return "image";
  if (family === "audio") return "audio";
  if (family === "video") return "video";
  return "file";
});

const label = $derived.by(() => {
  if (!active) return "";
  return "filename" in active && active.filename ? active.filename : active.mediaType;
});
</script>

<!-- One SDK file or reasoning-file part. Browsers get the native viewer
for media they can play; every other media type remains a download link
with its filename. -->
{#if active}
  <figure {...rest} data-scope="ai" data-part="media" data-kind={kind}>
    {#if kind === "image"}
      <img src={active.url} alt={alt ?? (label === active.mediaType ? "" : label)} />
    {:else if kind === "audio"}
      <audio src={active.url} controls></audio>
    {:else if kind === "video"}
      <!-- Generic SDK media carries no caption metadata; the filename link remains its equivalent alternative. -->
      <!-- svelte-ignore a11y_media_has_caption -->
      <video src={active.url} controls></video>
    {:else}
      <a data-scope="ai" data-part="file-link" href={active.url} target="_blank" rel="noreferrer">
        <InternalIcon name="file" />
        <span>{label}</span>
      </a>
    {/if}
  </figure>
{/if}
