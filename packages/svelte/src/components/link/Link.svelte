<script lang="ts">
import type { LinkProps } from "./props";

let { underline = "hover", children, ...rest }: LinkProps = $props();
</script>

<!-- A link is ink in the accent's voice: quiet at rest, deepening under
the hand, the halo at focus. The underline follows the prose — always,
on hover, or never. -->
<a {...rest} data-scope="link" data-part="root" data-underline={underline}>
  {@render children?.()}
</a>
