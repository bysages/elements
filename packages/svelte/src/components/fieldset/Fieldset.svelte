<script lang="ts">
import { Fieldset as ArkFieldset } from "@ark-ui/svelte/fieldset";

import FieldsetRoot from "./FieldsetRoot.svelte";

let {
  label,
  helperText,
  disabled = false,
  invalid = false,
  children,
  ...rest
}: {
  label?: string;
  helperText?: string;
  disabled?: boolean;
  invalid?: boolean;
  children?: import("svelte").Snippet;
} & import("@ark-ui/svelte/fieldset").FieldsetRootProps = $props();
</script>

<FieldsetRoot {disabled} {invalid} {...rest}>
  {#if label}<ArkFieldset.Legend>{label}</ArkFieldset.Legend>{/if}
  {@render children?.()}
  {#if helperText}<ArkFieldset.HelperText>{helperText}</ArkFieldset.HelperText>{/if}
</FieldsetRoot>
