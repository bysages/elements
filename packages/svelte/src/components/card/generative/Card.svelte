<script lang="ts">
  import { Card } from "../index";
  import type { BaseComponentProps } from "@json-render/svelte";

  let { props, children }: BaseComponentProps<any> = $props();
</script>

<Card.Root>
  {#if props.title != null || props.description != null}
    <Card.Header>
      {#if props.title != null}<Card.Title>{props.title}</Card.Title>{/if}
      {#if props.description != null}<Card.Description>{props.description}</Card.Description>{/if}
    </Card.Header>
  {/if}
  <Card.Content>
    {@render children?.()}
  </Card.Content>
</Card.Root>
