<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("number-input");

import { NumberInput as ArkNumberInput } from "@ark-ui/svelte/number-input";
import { useElementId } from "../../internal/id";
import type { NumberInputRootProps } from "./props";

let { size = "md", children, ...rest }: NumberInputRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("number-input", generatedId, rest.id));
</script>

<ArkNumberInput.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkNumberInput.Root>
