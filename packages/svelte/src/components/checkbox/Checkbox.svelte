<script lang="ts">
import { Checkbox as ArkCheckbox } from "@ark-ui/svelte/checkbox";

import CheckboxRoot from "./CheckboxRoot.svelte";
import InternalIcon from "../../internal/InternalIcon.svelte";

let {
  label,
  disabled = false,
  invalid = false,
  required = false,
  readOnly = false,
  children,
  ...rest
}: {
  label?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  readOnly?: boolean;
  children?: import("svelte").Snippet;
} & import("./props").CheckboxRootProps = $props();
</script>

<CheckboxRoot {disabled} {invalid} {required} readOnly={readOnly} {...rest}>
  <ArkCheckbox.Control>
    <ArkCheckbox.Indicator><InternalIcon name="check" /></ArkCheckbox.Indicator>
  </ArkCheckbox.Control>
  {#if label}<ArkCheckbox.Label>{label}</ArkCheckbox.Label>{/if}
  <ArkCheckbox.HiddenInput />
  {@render children?.()}
</CheckboxRoot>
