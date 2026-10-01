<script lang="ts">
  import { Progress } from "../index";
  import type { BaseComponentProps } from "@json-render/svelte";

  let { props }: BaseComponentProps<any> = $props();
</script>

<Progress.Root value={props.value}>
  {#if props.label != null}
    <Progress.Label>{props.label}</Progress.Label>
  {/if}
  <Progress.Track><Progress.Range /></Progress.Track>
</Progress.Root>
