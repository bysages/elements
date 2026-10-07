<script lang="ts">
  import { useMediaPlayer } from "./context";
  import InternalIcon from "../../internal/InternalIcon.svelte";

  let { label, ...rest }: { label?: string; [key: string]: unknown } = $props();
  const context = useMediaPlayer();
  const text = $derived(label ?? (context.controls.playing ? "Pause" : "Play"));
</script>

<button
  {...rest}
  type="button"
  data-scope="media-player"
  data-part="play-button"
  aria-label={text}
  aria-pressed={context.controls.playing}
  title={text}
  disabled={context.disabled}
  onclick={() => context.controls.toggle()}
>
  <InternalIcon name={context.controls.playing ? "pause" : "play"} size="sm" />
</button>
