<script lang="ts">
import { Listbox as ArkListbox } from "@ark-ui/svelte/listbox";
import type { ListboxRootProps } from "./props";

let { size = "md", children, ...rest }: ListboxRootProps = $props();
</script>

<ArkListbox.Root {...rest} data-size={size}>
  {@render children?.()}
</ArkListbox.Root>
