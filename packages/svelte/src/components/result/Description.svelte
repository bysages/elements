<script lang="ts">
  import { injectComponentStyle } from "@bysages/core/styling";
  import type { HTMLAttributes } from "svelte/elements";

  injectComponentStyle("result");

  type Props = HTMLAttributes<HTMLParagraphElement>;

  let { children, ...rest }: Props = $props();
</script>

<p {...rest} data-scope="result" data-part="description">
  {@render children?.()}
</p>
