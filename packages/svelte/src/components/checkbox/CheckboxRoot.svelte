<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("checkbox");

import { Checkbox as ArkCheckbox } from "@ark-ui/svelte/checkbox";
import { useElementId } from "../../internal/id";
import type { CheckboxRootProps } from "./props";

let { size = "md", children, ...rest }: CheckboxRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("checkbox", generatedId, rest.id));
</script>

<ArkCheckbox.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkCheckbox.Root>

