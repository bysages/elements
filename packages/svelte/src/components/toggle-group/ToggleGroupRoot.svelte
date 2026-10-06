<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("toggle-group");

import { ToggleGroup as ArkToggleGroup } from "@ark-ui/svelte/toggle-group";
import { useElementId } from "../../internal/id";
import type { ToggleGroupRootProps } from "./props";

let { size = "md", children, ...rest }: ToggleGroupRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("toggle-group", generatedId, rest.id));
</script>

<ArkToggleGroup.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkToggleGroup.Root>
