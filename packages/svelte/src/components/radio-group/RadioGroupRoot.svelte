<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("radio-group");

import { RadioGroup as ArkRadioGroup } from "@ark-ui/svelte/radio-group";
import type { RadioGroupRootProps } from "./props";

let { size = "md", children, ...rest }: RadioGroupRootProps = $props();
</script>

<ArkRadioGroup.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkRadioGroup.Root>
