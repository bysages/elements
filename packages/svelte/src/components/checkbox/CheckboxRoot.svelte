<script lang="ts">
import { Checkbox as ArkCheckbox } from "@ark-ui/svelte/checkbox";
import type { CheckboxRootProps } from "./props";

let { size = "md", children, ...rest }: CheckboxRootProps = $props();
</script>

<ArkCheckbox.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkCheckbox.Root>
