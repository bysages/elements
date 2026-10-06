<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("pin-input");

import { PinInput as ArkPinInput } from "@ark-ui/svelte/pin-input";
import { useElementId } from "../../internal/id";
import type { PinInputRootProps } from "./props";

let { size = "md", children, ...rest }: PinInputRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("pin-input", generatedId, rest.id));
</script>

<ArkPinInput.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkPinInput.Root>
