<script lang="ts">
  import { iconHtml } from "./icon";

  let { name, size = "md" }: { name: string; size?: "sm" | "md" | "lg" } = $props();

  const dimension = $derived(size === "sm" ? "0.75em" : size === "lg" ? "1.25em" : "1em");
</script>

{@html iconHtml(name, { width: dimension, height: dimension })}
