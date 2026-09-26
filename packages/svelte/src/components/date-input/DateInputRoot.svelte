<script lang="ts">
import { DateInput as ArkDateInput } from "@ark-ui/svelte/date-input";
import type { DateInputRootProps } from "./props";

let { size = "md", children, ...rest }: DateInputRootProps = $props();
</script>

<ArkDateInput.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkDateInput.Root>
