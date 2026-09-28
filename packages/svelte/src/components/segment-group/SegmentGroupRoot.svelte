<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("segment-group");

import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/svelte/segment-group";
import type { SegmentGroupRootProps } from "./props";

let { size = "md", children, ...rest }: SegmentGroupRootProps = $props();
</script>

<ArkSegmentGroup.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkSegmentGroup.Root>
