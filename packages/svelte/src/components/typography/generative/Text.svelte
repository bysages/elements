<script lang="ts">
  import { Typography } from "../index";
  import type { BaseComponentProps } from "@json-render/svelte";

  let { props }: BaseComponentProps<any> = $props();
</script>

{#if props.variant === "lead"}<Typography.Lead>{props.text}</Typography.Lead>{:else if props.variant === "muted"}<Typography.Muted>{props.text}</Typography.Muted>{:else if props.variant === "label"}<Typography.Label>{props.text}</Typography.Label>{:else}<Typography.Body>{props.text}</Typography.Body>{/if}
