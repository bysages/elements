<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("number-input");

import { NumberInput as ArkNumberInput } from "@ark-ui/svelte/number-input";
import type { NumberInputRootProps } from "./props";

let { size = "md", children, ...rest }: NumberInputRootProps = $props();
</script>

<ArkNumberInput.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkNumberInput.Root>
