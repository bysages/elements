<script lang="ts">
import type { InputGroupAddonProps } from "./props";

let { children, ...rest }: InputGroupAddonProps = $props();
</script>

<!-- A recessed cell for the reader's fixed words — a scheme, a unit, a
quiet button — placed before or after the entry. -->
<div {...rest} data-scope="input-group" data-part="addon">
  {@render children?.()}
</div>
