<script lang="ts">
  import { Badge } from "../index";
  import type { BaseComponentProps } from "@json-render/svelte";

  let { props }: BaseComponentProps<any> = $props();
</script>

<Badge tone={props.tone} variant={props.variant}>{props.text}</Badge>
