<script lang="ts">
  import { getBoundProp } from "@json-render/svelte";
  import type { BaseComponentProps } from "@json-render/svelte";

  import { Select } from "../index";

  let { props, bindings }: BaseComponentProps<any> = $props();

  const bound = getBoundProp<string>(
    () => props.value,
    () => bindings?.value,
  );

  function setValue(value: string | string[]) {
    bound.current = props.multiple
      ? Array.isArray(value)
        ? value
        : [value]
      : Array.isArray(value)
        ? (value.at(0) ?? "")
        : value;
  }
</script>

<Select
  label={props.label}
  placeholder={props.placeholder}
  options={props.options}
  multiple={props.multiple}
  disabled={props.disabled}
  value={bound.current}
  onValueChange={setValue}
/>
