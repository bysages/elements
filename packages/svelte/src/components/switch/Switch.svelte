<script lang="ts">
import { Switch as ArkSwitch } from "@ark-ui/svelte/switch";

import SwitchRoot from "./SwitchRoot.svelte";

let {
  checked = $bindable(false),
  defaultChecked = false,
  label,
  disabled = false,
  invalid = false,
  required = false,
  readOnly = false,
  children,
  ...rest
}: {
  checked?: boolean;
  defaultChecked?: boolean;
  label?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  readOnly?: boolean;
  children?: import("svelte").Snippet;
} & import("./props").SwitchRootProps = $props();
</script>

<SwitchRoot bind:checked {defaultChecked} {disabled} {invalid} {required} readOnly={readOnly} {...rest}>
  <ArkSwitch.Control><ArkSwitch.Thumb /></ArkSwitch.Control>
  {#if label}<ArkSwitch.Label>{label}</ArkSwitch.Label>{/if}
  <ArkSwitch.HiddenInput />
  {@render children?.()}
</SwitchRoot>
