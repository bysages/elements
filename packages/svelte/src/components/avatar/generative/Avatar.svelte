<script lang="ts">
  import { Avatar } from "../index";
  import type { BaseComponentProps } from "@json-render/svelte";

  let { props }: BaseComponentProps<any> = $props();
</script>

<Avatar name={props.name} size={props.size} src={props.src} />
