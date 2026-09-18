<script lang="ts">
import type { ListContentProps } from "./props";

let { title, description, children, ...rest }: ListContentProps = $props();
</script>

<!-- The row's words: the title and description ride their own named
snippets, the children snippet follows them for anything else. -->
<div {...rest} data-scope="list" data-part="content">
  {#if title}
    <div data-scope="list" data-part="title">{@render title()}</div>
  {/if}
  {#if description}
    <div data-scope="list" data-part="description">{@render description()}</div>
  {/if}
  {@render children?.()}
</div>
