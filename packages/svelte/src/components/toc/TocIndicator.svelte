<script lang="ts">
import { Toc as ArkToc } from "@ark-ui/svelte/toc";
import type { TocIndicatorProps } from "@ark-ui/svelte/toc";

let { children, ...rest }: TocIndicatorProps = $props();
</script>

<ArkToc.Indicator {...rest} aria-hidden="true">
  {@render children?.()}
</ArkToc.Indicator>
