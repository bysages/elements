<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("editable");

import { Editable as ArkEditable } from "@ark-ui/svelte/editable";
import { useElementId } from "../../internal/id";
import type { EditableRootProps } from "./props";

let { size = "md", children, ...rest }: EditableRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("editable", generatedId, rest.id));
</script>

<ArkEditable.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkEditable.Root>
