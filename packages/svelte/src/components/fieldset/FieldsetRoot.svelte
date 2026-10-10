<script lang="ts">
import { Fieldset as ArkFieldset } from "@ark-ui/svelte/fieldset";
import { injectComponentStyle } from "@bysages/core/styling";

import { useElementId } from "../../internal/id";
import type { FieldsetRootProps } from "@ark-ui/svelte/fieldset";

injectComponentStyle("fieldset");

let { ref = $bindable(null), children, ...rest }: FieldsetRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("fieldset", generatedId, rest.id));
</script>

<ArkFieldset.Root bind:ref {...rest} {id}>
  {@render children?.()}
</ArkFieldset.Root>

