<script lang="ts">
import { RadioGroup as ArkRadioGroup } from "@ark-ui/svelte/radio-group";
import type { RadioGroupRootProps } from "./props";

let { size = "md", children, ...rest }: RadioGroupRootProps = $props();
</script>

<ArkRadioGroup.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkRadioGroup.Root>
