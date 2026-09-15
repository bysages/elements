<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
import type { BadgeProps } from "./props";

let { tone = "ink", variant = "solid", children, ...rest }: BadgeProps = $props();

injectComponentStyle("badge");
</script>

<span {...rest} data-scope="badge" data-part="root" data-tone={tone} data-variant={variant}>
  {@render children?.()}
</span>
