<script lang="ts">
import { useFieldContext } from "@ark-ui/svelte/field";
import type { InputProps } from "./props";

let { value = $bindable(), size = "md", invalid = false, ...rest }: InputProps = $props();

const field = useFieldContext();

const fieldProps = $derived(field?.()?.getInputProps() ?? {});
</script>

<!-- The bare text input: the field recipe — border, surface, focus
halo — on a native control. Inside a Field.Root the context supplies
the label id, the described-by wiring and the invalid state, which is
also the seam the Form validation layer drives. -->
<input
  {...fieldProps}
  {...rest}
  bind:value
  data-scope="input"
  data-part="root"
  data-size={size}
  data-invalid={invalid || fieldProps["data-invalid"] != null ? "" : undefined}
  oninput={(event) => {
    value = event.currentTarget.value;
  }}
/>
