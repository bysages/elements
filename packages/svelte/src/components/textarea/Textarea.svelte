<script lang="ts">
import { useFieldContext } from "@ark-ui/svelte/field";
import type { TextareaProps } from "./props";

let { value = $bindable(), invalid = false, ...rest }: TextareaProps = $props();

const field = useFieldContext();

const fieldProps = $derived(field?.()?.getTextareaProps() ?? {});
</script>

<!-- The bare multi-line input: the field recipe on a `<textarea>`,
sized by rows and resizable in the block direction. Inside a
Field.Root the context supplies the label id, the described-by wiring
and the invalid state. -->
<textarea
  {...fieldProps}
  {...rest}
  bind:value
  data-scope="textarea"
  data-part="root"
  data-invalid={invalid || fieldProps["data-invalid"] != null ? "" : undefined}
  oninput={(event) => {
    value = event.currentTarget.value;
  }}
/>
