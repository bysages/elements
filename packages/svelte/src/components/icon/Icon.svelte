<script lang="ts">
import type { IconProps } from "./props";

let { size = "inherit", label, children, ...rest }: IconProps = $props();
</script>

<!-- The inkwell: a standard box that keeps any inline svg at its
optical measure and in the text's own ink — the icon carries no
pigment and no size of its own. Bring the glyph; it ships no set. -->
<span
  {...rest}
  role={label != null ? "img" : undefined}
  aria-label={label}
  aria-hidden={label != null ? undefined : "true"}
  data-scope="icon"
  data-part="root"
  data-size={size}
>
  {@render children?.()}
</span>
