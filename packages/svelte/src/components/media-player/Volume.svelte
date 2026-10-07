<script lang="ts">
  import { useMediaPlayer } from "./context";

  let { label = "Volume", ...rest }: { label?: string; [key: string]: unknown } = $props();
  const context = useMediaPlayer();
  const volume = $derived(context.controls.muted ? 0 : context.controls.volume);
</script>

<input
  {...rest}
  type="range"
  data-scope="media-player"
  data-part="volume"
  min="0"
  max="1"
  step="0.01"
  value={volume}
  disabled={context.disabled}
  aria-label={label}
  aria-valuetext="{Math.round(volume * 100)}%"
  style="--bs-media-progress: {volume * 100}%; {rest.style ?? ''}"
  oninput={(event) => context.controls.setVolume(Number(event.currentTarget.value))}
/>
