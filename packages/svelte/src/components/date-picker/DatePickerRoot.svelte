<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("date-picker");

import { DatePicker as ArkDatePicker } from "@ark-ui/svelte/date-picker";
import { useElementId } from "../../internal/id";
import type { DatePickerRootProps } from "./props";

let { size = "md", children, ...rest }: DatePickerRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("date-picker", generatedId, rest.id));
</script>

<ArkDatePicker.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkDatePicker.Root>

