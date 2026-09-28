<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("toggle-group");

import { ToggleGroup as ArkToggleGroup } from "@ark-ui/svelte/toggle-group";
import type { ToggleGroupRootProps } from "./props";

let { size = "md", children, ...rest }: ToggleGroupRootProps = $props();
</script>

<ArkToggleGroup.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkToggleGroup.Root>
