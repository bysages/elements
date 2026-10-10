<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("affix");

import type { Snippet } from "svelte";

import type { AffixProps } from "./props";

let { offsetTop, offsetBottom, children, ...rest }: AffixProps = $props();
</script>

<!-- A nail: the wrapped content travels with the page until it reaches
its offset, then stays put while the page moves on — plain
`position: sticky`, pinned to the nearest scrolling ancestor. -->
<div
  {...rest}
  style:--bs-affix-top={offsetTop}
  style:--bs-affix-bottom={offsetBottom}
  data-scope="affix"
  data-part="root"
>
  {@render children?.()}
</div>
