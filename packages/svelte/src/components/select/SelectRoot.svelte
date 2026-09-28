<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("select");

import { Select as ArkSelect } from "@ark-ui/svelte/select";
import type { SelectRootProps } from "./props";

let { size = "md", children, ...rest }: SelectRootProps = $props();
</script>

<ArkSelect.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkSelect.Root>
