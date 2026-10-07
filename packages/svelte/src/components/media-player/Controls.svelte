<script lang="ts">
  import MediaPart from "./MediaPart.svelte";
  let { children }: { children?: import("svelte").Snippet } = $props();
</script>

<MediaPart part="Controls" {children} />
