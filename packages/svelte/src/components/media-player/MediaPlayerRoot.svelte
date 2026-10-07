<script lang="ts">
  import { injectComponentStyle } from "@bysages/core";

  import { provideMediaPlayer } from "./context";
  import type { MediaPlayerKind, MediaPlayerProps } from "./props";
  import { useMediaControls } from "./use-media-controls.svelte";

  injectComponentStyle("media-player");

  let {
    kind,
    label = "Media player",
    src,
    sources = [],
    tracks = [],
    autoplay = false,
    loop = false,
    muted = false,
    preload = "metadata",
    volume = 1,
    playbackRate = 1,
    playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2],
    disabled = false,
    poster,
    playsInline = true,
    onplay,
    onpause,
    onended,
    ontimeupdate,
    onvolumechange,
    onratechange,
    onerror,
    children,
    ...rest
  }: MediaPlayerProps & { kind: MediaPlayerKind; children?: import("svelte").Snippet } = $props();

  let mediaElement = $state<HTMLMediaElement | null>(null);
  let rootElement = $state<HTMLDivElement | null>(null);
  const media = {
    get current() {
      return mediaElement;
    },
    set current(value: HTMLMediaElement | null) {
      mediaElement = value;
    },
  };
  const root = {
    get current() {
      return rootElement;
    },
  };
  const controls = useMediaControls(media);

  $effect(() => {
    const element = media.current;
    if (!element) return;
    element.volume = volume;
    element.playbackRate = playbackRate;
  });

  provideMediaPlayer({
    get kind() { return kind; },
    get label() { return label; },
    get src() { return src; },
    get sources() { return sources; },
    get tracks() { return tracks; },
    get autoplay() { return autoplay; },
    get loop() { return loop; },
    get muted() { return muted; },
    get preload() { return preload; },
    get poster() { return poster; },
    get playsInline() { return playsInline; },
    get disabled() { return disabled; },
    media,
    root,
    controls,
    emit(event, source) {
      if (event === "play") onplay?.(source);
      if (event === "pause") onpause?.(source);
      if (event === "ended") onended?.(source);
      if (event === "timeupdate") ontimeupdate?.(source);
      if (event === "volumechange") onvolumechange?.(source);
      if (event === "ratechange") onratechange?.(source);
      if (event === "error") onerror?.(source);
    },
  });
</script>

<div bind:this={rootElement} {...rest} data-scope="media-player" data-part="root" data-kind={kind}
  data-playing={controls.playing} data-muted={controls.muted}
  data-error={controls.error ? "" : undefined}
>
  {@render children?.()}
</div>
