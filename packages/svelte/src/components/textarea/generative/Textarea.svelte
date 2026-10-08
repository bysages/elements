<script lang="ts">
  import { getBoundProp } from "@json-render/svelte";
  import type { BaseComponentProps } from "@json-render/svelte";

  import { Stack, Textarea, Typography } from "../index";

  let { props, bindings }: BaseComponentProps<any> = $props();

  const bound = getBoundProp<string>(
    () => props.value,
    () => bindings?.value,
  );
</script>

{#if props.label}
  <Stack gap="xs">
    <Typography.Label>{props.label}</Typography.Label>
    <Textarea
      bind:value={bound.current}
      placeholder={props.placeholder}
      rows={props.rows}
      disabled={props.disabled}
    />
  </Stack>
{:else}
  <Textarea
      bind:value={bound.current}
      placeholder={props.placeholder}
      rows={props.rows}
      disabled={props.disabled}
    />
{/if}
