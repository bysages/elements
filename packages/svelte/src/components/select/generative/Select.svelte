<script lang="ts">
  import { createListCollection } from "@ark-ui/svelte/collection";
  import { getBoundProp } from "@json-render/svelte";
  import type { BaseComponentProps } from "@json-render/svelte";

  import InternalIcon from "../../../internal/InternalIcon.svelte";
  import { Select, Stack, Typography } from "../index";

  let { props, bindings }: BaseComponentProps<any> = $props();

  const bound = getBoundProp<string>(
    () => props.value,
    () => bindings?.value,
  );

  const collection = $derived(
    createListCollection({ items: props.options }),
  );

  function setValue(details: { value: string[] }) {
    bound.current = details.value[0];
  }
</script>

{#if props.label}
  <Stack gap="xs">
    <Typography.Label>{props.label}</Typography.Label>
    <Select.Root {collection} value={bound.current} onValueChange={setValue}>
      <Select.Control>
        <Select.Trigger>
          <Select.ValueText placeholder={props.placeholder} />
        </Select.Trigger>
        <Select.Indicator><InternalIcon name="chevrons-up-down" /></Select.Indicator>
      </Select.Control>
      <Select.Positioner>
        <Select.Content>
          <Select.ItemGroup>
            {#each props.options as option (option.value)}
              <Select.Item item={option}>
                <Select.ItemText>{option.label}</Select.ItemText>
                <Select.ItemIndicator><InternalIcon name="check" /></Select.ItemIndicator>
              </Select.Item>
            {/each}
          </Select.ItemGroup>
        </Select.Content>
      </Select.Positioner>
      <Select.HiddenSelect />
    </Select.Root>
  </Stack>
{:else}
  <Select.Root {collection} value={bound.current} onValueChange={setValue}>
    <Select.Control>
      <Select.Trigger>
        <Select.ValueText placeholder={props.placeholder} />
      </Select.Trigger>
      <Select.Indicator><InternalIcon name="chevrons-up-down" /></Select.Indicator>
    </Select.Control>
    <Select.Positioner>
      <Select.Content>
        <Select.ItemGroup>
          {#each props.options as option (option.value)}
            <Select.Item item={option}>
              <Select.ItemText>{option.label}</Select.ItemText>
              <Select.ItemIndicator><InternalIcon name="check" /></Select.ItemIndicator>
            </Select.Item>
          {/each}
        </Select.ItemGroup>
      </Select.Content>
    </Select.Positioner>
    <Select.HiddenSelect />
  </Select.Root>
{/if}
