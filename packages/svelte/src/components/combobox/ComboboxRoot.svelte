<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("combobox");

import { Combobox as ArkCombobox } from "@ark-ui/svelte/combobox";
import { useElementId } from "../../internal/id";
import type { ComboboxRootProps } from "./props";

let { size = "md", children, ...rest }: ComboboxRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("combobox", generatedId, rest.id));
</script>

<ArkCombobox.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkCombobox.Root>
