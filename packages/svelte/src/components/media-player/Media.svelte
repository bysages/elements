<script lang="ts">
  import { useMediaPlayer } from "./context";

  let { children, ...rest }: { children?: import("svelte").Snippet; [key: string]: unknown } = $props();
  const context = useMediaPlayer();
</script>

<svelte:element
  this={context.kind === "video" ? "video" : "audio"}
  bind:this={context.media.current}
  {...rest}
  src={context.sources.length > 0 ? undefined : context.src}
  data-scope="media-player"
  data-part="media"
  autoplay={context.autoplay}
  loop={context.loop}
  muted={context.muted}
  preload={context.preload}
  poster={context.poster}
  playsinline={context.playsInline}
  aria-label={context.label}
  onplay={(event) => context.emit("play", event)}
  onpause={(event) => context.emit("pause", event)}
  onended={(event) => context.emit("ended", event)}
  ontimeupdate={(event) => context.emit("timeupdate", event)}
  onvolumechange={(event) => context.emit("volumechange", event)}
  onratechange={(event) => context.emit("ratechange", event)}
  onerror={(event) => context.emit("error", event)}
>
  {#each context.sources as source (source.src)}
    <source {src} type={source.type} />
  {/each}
  {#each context.tracks as track (track.src)}
    <track src={track.src} kind={track.kind ?? "subtitles"} label={track.label} srclang={track.srcLang} default={track.default} />
  {/each}
  {@render children?.()}
</svelte:element>
