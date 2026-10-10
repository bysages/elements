<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("date-input");

import { DateInput as ArkDateInput } from "@ark-ui/svelte/date-input";
import { useElementId } from "../../internal/id";
import type { DateInputRootProps } from "./props";

let { size = "md", children, ...rest }: DateInputRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("date-input", generatedId, rest.id));
</script>

<ArkDateInput.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkDateInput.Root>

