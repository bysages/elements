<script lang="ts">
  import { Button } from "../index";
  import type { BaseComponentProps } from "@json-render/svelte";

  let { props, emit }: BaseComponentProps<any> = $props();
</script>

<Button
  variant={props.variant ?? "solid"}
  tone={props.tone}
  size={props.size}
  disabled={props.disabled}
  onclick={() => emit("press")}
>
  {props.label}
</Button>
