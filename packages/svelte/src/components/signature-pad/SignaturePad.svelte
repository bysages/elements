<script lang="ts">
import { SignaturePad as ArkSignaturePad } from "@ark-ui/svelte/signature-pad";

import SignaturePadRoot from "./SignaturePadRoot.svelte";

let {
  value = $bindable(),
  defaultValue,
  label,
  placeholder,
  disabled = false,
  required = false,
  clearable = true,
  readOnly = false,
  children,
  ...rest
}: {
  value?: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  /** Show the reset control. */
  clearable?: boolean;
  readOnly?: boolean;
  children?: import("svelte").Snippet;
} & import("@ark-ui/svelte/signature-pad").SignaturePadRootProps = $props();
</script>

<SignaturePadRoot bind:value {defaultValue} {placeholder} {disabled} {required} readOnly={readOnly} {...rest}>
  {#if label}<ArkSignaturePad.Label>{label}</ArkSignaturePad.Label>{/if}
  <ArkSignaturePad.Control>
    <ArkSignaturePad.Segment>
      <ArkSignaturePad.Guide />
    </ArkSignaturePad.Segment>
  </ArkSignaturePad.Control>
  {#if clearable}<ArkSignaturePad.ClearTrigger>Clear</ArkSignaturePad.ClearTrigger>{/if}
  {@render children?.()}
</SignaturePadRoot>
