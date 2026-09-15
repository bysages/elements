<script lang="ts">
import type { ChipProps } from "./props";

let { value, max, tone = "ink", variant = "solid", ...rest }: ChipProps = $props();
</script>

<span {...rest} data-scope="chip" data-part="root" data-tone={tone} data-variant={variant}>
  {max != null && value > max ? `${max}+` : String(value)}
</span>
