<script lang="ts">
  import { getBoundProp } from "@json-render/svelte";
  import type { BaseComponentProps } from "@json-render/svelte";

  import { Switch } from "../index";

  let { props, bindings }: BaseComponentProps<any> = $props();

  const bound = getBoundProp<boolean>(
    () => props.checked,
    () => bindings?.checked,
  );
</script>

<Switch.Root bind:checked={bound.current}>
  <Switch.Control><Switch.Thumb /></Switch.Control>
  {#if props.label != null}
    <Switch.Label>{props.label}</Switch.Label>
  {/if}
  <Switch.HiddenInput />
</Switch.Root>
