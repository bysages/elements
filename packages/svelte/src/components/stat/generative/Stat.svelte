<script lang="ts">
  import { Stat } from "../index";
  import type { BaseComponentProps } from "@json-render/svelte";

  let { props }: BaseComponentProps<any> = $props();
</script>

<Stat.Root>
  <Stat.Label>{props.label}</Stat.Label>
  <Stat.Value>{props.value}</Stat.Value>
  {#if props.change != null}
    <Stat.Delta direction={props.direction ?? "flat"}>{props.change}</Stat.Delta>
  {/if}
</Stat.Root>
