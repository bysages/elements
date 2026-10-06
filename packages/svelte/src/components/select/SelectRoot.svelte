<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("select");

import { Select as ArkSelect } from "@ark-ui/svelte/select";
import { useElementId } from "../../internal/id";
import type { SelectRootProps } from "./props";

let { size = "md", children, ...rest }: SelectRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("select", generatedId, rest.id));
</script>

<ArkSelect.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkSelect.Root>
