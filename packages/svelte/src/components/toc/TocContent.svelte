<script lang="ts">
import { Toc as ArkToc } from "@ark-ui/svelte/toc";
import type { TocContentProps } from "@ark-ui/svelte/toc";

let { children, ...rest }: TocContentProps = $props();
</script>

<ArkToc.Content {...rest} tabindex="0">
  {@render children?.()}
</ArkToc.Content>
