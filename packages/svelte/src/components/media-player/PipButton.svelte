<script lang="ts">
  import { useMediaPlayer } from "./context";
  import InternalIcon from "../../internal/InternalIcon.svelte";

  let { label = "Toggle picture in picture", ...rest }: { label?: string; [key: string]: unknown } = $props();
  const context = useMediaPlayer();
</script>

{#if context.kind === "video"}
  <button
    {...rest}
    type="button"
    data-scope="media-player"
    data-part="pip-button"
    aria-label={label}
    title={label}
    disabled={context.disabled}
    onclick={() => context.controls.togglePictureInPicture()}
  >
    <InternalIcon name="picture-in-picture" size="sm" />
  </button>
{/if}
