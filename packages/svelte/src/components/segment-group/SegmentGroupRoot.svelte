<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("segment-group");

import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/svelte/segment-group";
import { useElementId } from "../../internal/id";
import type { SegmentGroupRootProps } from "./props";

let { size = "md", children, ...rest }: SegmentGroupRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("segment-group", generatedId, rest.id));
</script>

<ArkSegmentGroup.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkSegmentGroup.Root>

