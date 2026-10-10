<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("listbox");

import { Listbox as ArkListbox } from "@ark-ui/svelte/listbox";
import { useElementId } from "../../internal/id";
import type { ListboxRootProps } from "./props";

let { size = "md", children, ...rest }: ListboxRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("listbox", generatedId, rest.id));
</script>

<ArkListbox.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkListbox.Root>

