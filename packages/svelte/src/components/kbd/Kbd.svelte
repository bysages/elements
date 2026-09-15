<script lang="ts">
import type { KbdProps } from "./props";

let { children, ...rest }: KbdProps = $props();
</script>

<kbd {...rest} data-scope="kbd" data-part="root">
  {@render children?.()}
</kbd>
