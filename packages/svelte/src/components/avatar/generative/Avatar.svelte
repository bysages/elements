<script lang="ts">
  import { Avatar } from "../index";
  import { initials } from "../../../generative/shared";
  import type { BaseComponentProps } from "@json-render/svelte";

  let { props }: BaseComponentProps<any> = $props();
</script>

<Avatar.Root size={props.size}>
  {#if props.src != null}
    <Avatar.Image src={props.src} alt={props.name} />
  {/if}
  <Avatar.Fallback>{initials(props.name)}</Avatar.Fallback>
</Avatar.Root>
