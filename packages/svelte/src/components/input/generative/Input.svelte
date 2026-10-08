<script lang="ts">
  import { getBoundProp } from "@json-render/svelte";
  import type { BaseComponentProps } from "@json-render/svelte";

  import { Input, Stack, Typography } from "../index";

  let { props, bindings }: BaseComponentProps<any> = $props();

  const bound = getBoundProp<string>(
    () => props.value,
    () => bindings?.value,
  );
</script>

{#if props.label}
  <Stack gap="xs">
    <Typography.Label>{props.label}</Typography.Label>
    <Input
      bind:value={bound.current}
      placeholder={props.placeholder}
      type={props.type}
      disabled={props.disabled}
    />
  </Stack>
{:else}
  <Input
      bind:value={bound.current}
      placeholder={props.placeholder}
      type={props.type}
      disabled={props.disabled}
    />
{/if}
