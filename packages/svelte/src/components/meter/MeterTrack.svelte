<script lang="ts">
import type { MeterPartProps } from "./props";

let { children, ...rest }: MeterPartProps = $props();
</script>

<span {...rest} data-scope="meter" data-part="track">
  <span data-scope="meter" data-part="range" />
</span>
