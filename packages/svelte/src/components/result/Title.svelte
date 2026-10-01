<script lang="ts">
  import { injectComponentStyle } from "@bysages/core";
  import type { HTMLAttributes } from "svelte/elements";

  injectComponentStyle("result");

  type Props = HTMLAttributes<HTMLHeadingElement>;

  let { children, ...rest }: Props = $props();
</script>

<h3 {...rest} data-scope="result" data-part="title">
  {@render children?.()}
</h3>