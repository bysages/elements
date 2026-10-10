<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("color-picker");

import { ColorPicker as ArkColorPicker } from "@ark-ui/svelte/color-picker";
import { useElementId } from "../../internal/id";
import type { ColorPickerRootProps } from "./props";

let { size = "md", children, ...rest }: ColorPickerRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("color-picker", generatedId, rest.id));
</script>

<ArkColorPicker.Root {...rest} {id} data-size={size}>
  {@render children?.()}
</ArkColorPicker.Root>

