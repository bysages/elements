<script lang="ts">
import { QrCode as ArkQrCode } from "@ark-ui/svelte/qr-code";
import { injectComponentStyle } from "@bysages/core";

import { useElementId } from "../../internal/id";
import type { QrCodeRootProps } from "@ark-ui/svelte/qr-code";

injectComponentStyle("qr-code");

let { ref = $bindable(null), value = $bindable(), children, ...rest }: QrCodeRootProps = $props();
const generatedId = $props.id();
const id = $derived(useElementId("qr-code", generatedId, rest.id));
</script>

<ArkQrCode.Root bind:ref bind:value {...rest} {id}>
  {@render children?.()}
</ArkQrCode.Root>
