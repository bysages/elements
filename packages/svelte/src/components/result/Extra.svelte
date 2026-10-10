<script lang="ts">
  import { injectComponentStyle } from "@bysages/core/styling";
  import type { HTMLAttributes } from "svelte/elements";

  injectComponentStyle("result");

  type Props = HTMLAttributes<HTMLDivElement>;

  let { children, ...rest }: Props = $props();
</script>

<div {...rest} data-scope="result" data-part="extra">
  {@render children?.()}
</div>
