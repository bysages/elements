<script lang="ts">
import type { SpinnerProps } from "./props";

let { size = "md", children, ...rest }: SpinnerProps = $props();
</script>

<!-- A wheel of waiting: one arc of ink turning about its center. Quiet
by default — it reports progress without claiming attention. -->
<span
  {...rest}
  role="status"
  aria-label={rest["aria-label"] ?? "Loading"}
  data-scope="spinner"
  data-part="root"
  data-size={size}
>
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-opacity="0.2" stroke-width="2.5" />
    <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" />
  </svg>
  {@render children?.()}
</span>
