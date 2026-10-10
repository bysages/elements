<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("icon");

  import { getIcon } from "@bysages/core/icons";
  import type { IconProps } from "./props";

  let { size = "inherit", label, glyph, name, children, ...rest }: IconProps = $props();

  const resolved = $derived(glyph ?? (name && children == null ? getIcon(name) : undefined));

  $effect(() => {
    if (name && children == null && glyph == null && !resolved) {
      console.error(
        `[icons] unknown icon name "${name}" — not in the core default registry; pass it explicitly as glyph`,
      );
    }
  });
</script>

<!-- The inkwell: a standard box that keeps any inline svg at its
optical measure and in the text's own ink — the icon carries no
pigment and no size of its own. Bring an `@bysages/icons` export or any other IconifyIcon through `glyph`, a built-in core-registry name through `name`, or your own svg; the well renders either. -->
<span
  {...rest}
  role={label != null ? "img" : undefined}
  aria-label={label}
  aria-hidden={label != null ? undefined : "true"}
  data-scope="icon"
  data-part="root"
  data-size={size}
>
  {#if children}
    {@render children()}
  {:else if resolved}
    <svg viewBox="0 0 {resolved.width ?? 24} {resolved.height ?? 24}" fill="currentColor" aria-hidden="true">
      {@html resolved.body}
    </svg>
  {/if}
</span>

