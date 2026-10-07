<script lang="ts">
  import MediaPlayerRoot from "./MediaPlayerRoot.svelte";
  import type { MediaPlayerProps } from "./props";

  let { children, ...rest }: MediaPlayerProps & { children?: import("svelte").Snippet } = $props();
</script>

<MediaPlayerRoot kind="video" {...rest}>
  {@render children?.()}
</MediaPlayerRoot>
