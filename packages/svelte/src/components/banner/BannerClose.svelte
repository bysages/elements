<script lang="ts">
import type { BannerCloseProps } from "./props";

let { type = "button", ...rest }: BannerCloseProps = $props();
</script>

<!-- The quiet close: a plain square-cut button; dismissal stays the
consumer's state. -->
<button
  {...rest}
  {type}
  aria-label={rest["aria-label"] ?? "Dismiss"}
  data-scope="banner"
  data-part="close"
>
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
  </svg>
</button>
