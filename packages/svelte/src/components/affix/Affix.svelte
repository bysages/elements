<script lang="ts">
import type { Snippet } from "svelte";

import type { AffixProps } from "./props";

let { offsetTop = "0px", offsetBottom = "0px", children, ...rest }: AffixProps = $props();
</script>

<!-- A nail: the wrapped content travels with the page until it reaches
its offset, then stays put while the page moves on — plain
`position: sticky`, pinned to the nearest scrolling ancestor. -->
<div
  {...rest}
  style:top={offsetTop}
  style:bottom={offsetBottom}
  data-scope="affix"
  data-part="root"
>
  {@render children?.()}
</div>
