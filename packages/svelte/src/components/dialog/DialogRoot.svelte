<script lang="ts">
import { Dialog as ArkDialog } from "@ark-ui/svelte/dialog";
import { injectComponentStyle } from "@bysages/core";

import { useElementId } from "../../internal/id";
import type { DialogRootProps } from "@ark-ui/svelte/dialog";

injectComponentStyle("dialog");

let { open = $bindable(), children, ...rest }: DialogRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("dialog", generatedId, rest.id));
</script>

<ArkDialog.Root bind:open {...rest} {id}>
  {@render children?.()}
</ArkDialog.Root>
