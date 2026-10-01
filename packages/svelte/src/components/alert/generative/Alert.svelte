<script lang="ts">
  import { Alert } from "../index";
  import type { BaseComponentProps } from "@json-render/svelte";

  let { props }: BaseComponentProps<any> = $props();
</script>

<Alert.Root status={props.status ?? "ink"}>
  <Alert.Icon />
  <Alert.Body>
    <Alert.Title>{props.title}</Alert.Title>
    {#if props.message != null}
      <Alert.Description>{props.message}</Alert.Description>
    {/if}
  </Alert.Body>
</Alert.Root>
