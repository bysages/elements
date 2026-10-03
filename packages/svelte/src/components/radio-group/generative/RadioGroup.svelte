<script lang="ts">
  import { RadioGroup, Stack, Typography } from "../index";
  import { slug } from "../../../generative/shared";
  import type { BaseComponentProps } from "@json-render/svelte";

  let { props }: BaseComponentProps<any> = $props();

  const values = $derived(props.items ?? ["Xuan", "Mian", "Lusong"]);
</script>

{#if props.label}
  <Stack gap="xs">
    <Typography.Label>{props.label}</Typography.Label>
    <RadioGroup.Root defaultValue={slug(values[0] ?? "")}>
      <Stack direction="column" gap="sm">
        {#each values as value (value)}
          <RadioGroup.Item value={value}>
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>{value}</RadioGroup.ItemText>
            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>
        {/each}
      </Stack>
    </RadioGroup.Root>
  </Stack>
{:else}
  <RadioGroup.Root defaultValue={slug(values[0] ?? "")}>
    <Stack direction="column" gap="sm">
      {#each values as value (value)}
        <RadioGroup.Item value={value}>
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>{value}</RadioGroup.ItemText>
          <RadioGroup.ItemHiddenInput />
        </RadioGroup.Item>
      {/each}
    </Stack>
  </RadioGroup.Root>
{/if}
