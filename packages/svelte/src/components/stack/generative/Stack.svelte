<script lang="ts">
  import { Stack } from "../index";
  import type { BaseComponentProps } from "@json-render/svelte";

  let { props, children }: BaseComponentProps<any> = $props();
</script>

<Stack
  direction={props.direction ?? "column"}
  gap={props.gap ?? "md"}
  align={props.align}
  justify={props.justify}
  wrap={props.wrap}
>
  {@render children?.()}
</Stack>
