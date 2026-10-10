<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("radio-group");

import { RadioGroup as ArkRadioGroup } from "@ark-ui/svelte/radio-group";
import { useElementId } from "../../internal/id";
import type { RadioGroupRootProps } from "./props";

let { size = "md", children, ...rest }: RadioGroupRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("radio-group", generatedId, rest.id));
</script>

<ArkRadioGroup.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkRadioGroup.Root>

