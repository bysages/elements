<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("date-picker");

import { DatePicker as ArkDatePicker } from "@ark-ui/svelte/date-picker";
import type { DatePickerRootProps } from "./props";

let { size = "md", children, ...rest }: DatePickerRootProps = $props();
</script>

<ArkDatePicker.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkDatePicker.Root>
