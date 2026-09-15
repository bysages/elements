<script lang="ts">
import type { SourceProps } from "./props";

let { href, children, ...rest }: SourceProps = $props();
</script>

<!-- One place the ink came from; href and the rest ride the anchor. -->
<li data-scope="ai" data-part="source">
  <a {...rest} href={href} target="_blank" rel="noreferrer">
    {#if children}{@render children()}{:else}{href}{/if}
  </a>
</li>
