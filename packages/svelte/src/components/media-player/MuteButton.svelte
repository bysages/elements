<script lang="ts">
  import { useMediaPlayer } from "./context";
  import InternalIcon from "../../internal/InternalIcon.svelte";

  let { label, ...rest }: { label?: string; [key: string]: unknown } = $props();
  const context = useMediaPlayer();
  const muted = $derived(context.controls.muted || context.controls.volume === 0);
  const text = $derived(label ?? (muted ? "Unmute" : "Mute"));
</script>

<button
  {...rest}
  type="button"
  data-scope="media-player"
  data-part="mute-button"
  aria-label={text}
  aria-pressed={muted}
  title={text}
  disabled={context.disabled}
  onclick={() => context.controls.toggleMuted()}
>
  <InternalIcon name={muted ? "volume-x" : "volume-2"} size="sm" />
</button>
