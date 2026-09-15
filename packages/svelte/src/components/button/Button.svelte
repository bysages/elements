<script lang="ts">
import type { ButtonProps } from "./props";

let {
  variant = "solid",
  tone = "ink",
  size = "md",
  square = false,
  as,
  type = "button",
  disabled = false,
  children,
  ...rest
}: ButtonProps = $props();
</script>

<svelte:element
  this={as ?? "button"}
  {...rest}
  type={as ? undefined : type}
  disabled={as ? undefined : disabled}
  data-scope="button"
  data-part="root"
  data-variant={variant}
  data-tone={tone}
  data-size={size}
  data-square={square ? "true" : undefined}
  data-motion="ink-ripple lit"
>
  {@render children?.()}
</svelte:element>
