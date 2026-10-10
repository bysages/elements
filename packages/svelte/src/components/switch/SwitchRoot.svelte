<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("switch");

import { Switch as ArkSwitch } from "@ark-ui/svelte/switch";
import { useElementId } from "../../internal/id";
import type { SwitchRootProps } from "./props";

let { size = "md", children, ...rest }: SwitchRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("switch", generatedId, rest.id));
</script>

<ArkSwitch.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkSwitch.Root>

