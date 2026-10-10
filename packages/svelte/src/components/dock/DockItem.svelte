<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
import type { HTMLAttributes } from "svelte/elements";

injectComponentStyle("dock");

type Props = HTMLAttributes<HTMLDivElement>;

let { children, ...rest }: Props = $props();
</script>

<!-- One moored place in the rail: whatever slots in grows from the
     floor, never from its center. -->
<div {...rest} data-scope="dock" data-part="item">
  {@render children?.()}
</div>

