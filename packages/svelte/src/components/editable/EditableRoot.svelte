<script lang="ts">
import { Editable as ArkEditable } from "@ark-ui/svelte/editable";
import type { EditableRootProps } from "./props";

let { size = "md", children, ...rest }: EditableRootProps = $props();
</script>

<ArkEditable.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkEditable.Root>
