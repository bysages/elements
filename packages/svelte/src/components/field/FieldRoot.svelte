<script lang="ts">
import { Field as ArkField } from "@ark-ui/svelte/field";
import { injectComponentStyle } from "@bysages/core/styling";

import { useElementId } from "../../internal/id";
import type { FieldRootProps } from "@ark-ui/svelte/field";

injectComponentStyle("field");

let { ref = $bindable(null), children, ...rest }: FieldRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("field", generatedId, rest.id));
</script>

<ArkField.Root bind:ref {...rest} {id}>
  {@render children?.()}
</ArkField.Root>

