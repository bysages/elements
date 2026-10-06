<script lang="ts">
import { Editable as ArkEditable } from "@ark-ui/svelte/editable";

import EditableRoot from "./EditableRoot.svelte";
import InternalIcon from "../../internal/InternalIcon.svelte";

let {
  value = $bindable(),
  defaultValue,
  label,
  placeholder,
  disabled = false,
  invalid = false,
  required = false,
  children,
  ...rest
}: {
  value?: string;
  defaultValue?: string;
  label?: string;
  placeholder?: string;
  disabled?: boolean;
  invalid?: boolean;
  required?: boolean;
  children?: import("svelte").Snippet;
} & import("./props").EditableRootProps = $props();
</script>

<EditableRoot bind:value {defaultValue} {placeholder} {disabled} {invalid} {required} {...rest}>
  {#if label}<ArkEditable.Label>{label}</ArkEditable.Label>{/if}
  <ArkEditable.Area>
    <ArkEditable.Preview />
    <ArkEditable.Input />
  </ArkEditable.Area>
  <ArkEditable.Control>
    <ArkEditable.EditTrigger aria-label="Edit"><InternalIcon name="pencil" /></ArkEditable.EditTrigger>
    <ArkEditable.SubmitTrigger aria-label="Submit"><InternalIcon name="check" /></ArkEditable.SubmitTrigger>
    <ArkEditable.CancelTrigger aria-label="Cancel"><InternalIcon name="x" /></ArkEditable.CancelTrigger>
  </ArkEditable.Control>
  {@render children?.()}
</EditableRoot>
