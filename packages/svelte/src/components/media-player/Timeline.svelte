<script lang="ts">
  import { useMediaPlayer } from "./context";
  import { formatMediaTime } from "./use-media-controls.svelte";

  let { label = "Seek", ...rest }: { label?: string; [key: string]: unknown } = $props();
  const context = useMediaPlayer();
  const progress = $derived(
    context.controls.duration > 0
      ? Math.min((context.controls.currentTime / context.controls.duration) * 100, 100)
      : 0
  );
</script>

<input
  {...rest}
  type="range"
  data-scope="media-player"
  data-part="timeline"
  min="0"
  max={context.controls.duration || 0}
  step="0.1"
  value={context.controls.currentTime}
  disabled={context.disabled || context.controls.duration <= 0}
  aria-label={label}
  aria-valuetext={formatMediaTime(context.controls.currentTime)}
  style="--bs-media-progress: {progress}%; {rest.style ?? ''}"
  oninput={(event) => context.controls.seek(Number(event.currentTarget.value))}
/>
