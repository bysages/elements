<script lang="ts">
  let {
    children,
    part,
    ...rest
  }: { children?: import("svelte").Snippet; part: string; [key: string]: unknown } = $props();
</script>

<div {...rest} data-scope="media-player" data-part={part.toLowerCase()}>
  {@render children?.()}
</div>
