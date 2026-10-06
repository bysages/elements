<script lang="ts">
import { QrCode as ArkQrCode } from "@ark-ui/svelte/qr-code";

import QrCodeRoot from "./QrCodeRoot.svelte";

let { value = $bindable(), defaultValue, children, ...rest }: {
  value?: string;
  defaultValue?: string;
  children?: import("svelte").Snippet;
} & import("@ark-ui/svelte/qr-code").QrCodeRootProps = $props();
</script>

<QrCodeRoot bind:value {defaultValue} {...rest}>
  <ArkQrCode.Frame><ArkQrCode.Pattern /></ArkQrCode.Frame>
  {@render children?.()}
</QrCodeRoot>
