<script lang="ts">
import { SignaturePad as ArkSignaturePad } from "@ark-ui/svelte/signature-pad";
import { injectComponentStyle } from "@bysages/core/styling";

import { useElementId } from "../../internal/id";
import type { SignaturePadRootProps } from "@ark-ui/svelte/signature-pad";

injectComponentStyle("signature-pad");

let { ref = $bindable(null), paths = $bindable(), children, ...rest }: SignaturePadRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("signature-pad", generatedId, rest.id));
</script>

<ArkSignaturePad.Root bind:ref bind:paths {...rest} {id}>
  {@render children?.()}
</ArkSignaturePad.Root>

