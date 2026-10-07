<script lang="ts">
  import { useMediaPlayer } from "./context";
  import InternalIcon from "../../internal/InternalIcon.svelte";

  let { label = "Toggle fullscreen", ...rest }: { label?: string; [key: string]: unknown } = $props();
  const context = useMediaPlayer();
</script>

{#if context.root.current}
  <button
    {...rest}
    type="button"
    data-scope="media-player"
    data-part="fullscreen-button"
    aria-label={label}
    title={label}
    disabled={context.disabled}
    onclick={() => context.controls.toggleFullscreen(context.root.current!)}
  >
    <InternalIcon name="maximize-2" size="sm" />
  </button>
{/if}
