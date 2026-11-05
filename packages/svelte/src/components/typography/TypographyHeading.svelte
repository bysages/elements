<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("typography");

import type { TypographyHeadingProps } from "./props";

let { size, as = "p", children, ...rest }: TypographyHeadingProps = $props();
</script>

<svelte:element
  this={as}
  {...rest}
  data-scope="typography"
  data-part="heading"
  data-size={size}
>
  {@render children?.()}
</svelte:element>
