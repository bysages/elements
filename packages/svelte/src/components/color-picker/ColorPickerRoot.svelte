<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("color-picker");

import { ColorPicker as ArkColorPicker } from "@ark-ui/svelte/color-picker";
import type { ColorPickerRootProps } from "./props";

let { size = "md", children, ...rest }: ColorPickerRootProps = $props();
</script>

<ArkColorPicker.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkColorPicker.Root>
