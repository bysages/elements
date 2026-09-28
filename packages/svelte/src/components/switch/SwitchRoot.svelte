<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("switch");

import { Switch as ArkSwitch } from "@ark-ui/svelte/switch";
import type { SwitchRootProps } from "./props";

let { size = "md", children, ...rest }: SwitchRootProps = $props();
</script>

<ArkSwitch.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkSwitch.Root>
