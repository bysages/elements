<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("pin-input");

import { PinInput as ArkPinInput } from "@ark-ui/svelte/pin-input";
import type { PinInputRootProps } from "./props";

let { size = "md", children, ...rest }: PinInputRootProps = $props();
</script>

<ArkPinInput.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkPinInput.Root>
