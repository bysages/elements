<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("combobox");

import { Combobox as ArkCombobox } from "@ark-ui/svelte/combobox";
import type { ComboboxRootProps } from "./props";

let { size = "md", children, ...rest }: ComboboxRootProps = $props();
</script>

<ArkCombobox.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkCombobox.Root>
