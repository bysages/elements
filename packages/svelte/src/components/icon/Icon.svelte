<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("icon");

  import { getIcon } from "@bysages/core/icons";
  import type { IconProps } from "./props";

  let { size = "inherit", label, glyph, name, children, ...rest }: IconProps = $props();

  const resolved = glyph ?? (name && children == null ? getIcon(name) : undefined);
  if (name && children == null && glyph == null && !resolved) {
    console.error(
      `[icons] unknown icon name "${name}" — not in the wrappers' whitelist; import the glyph from @bysages/icons and pass it as glyph`,
    );
  }
</script>

<!-- The inkwell: a standard box that keeps any inline svg at its
optical measure and in the text's own ink — the icon carries no
pigment and no size of its own. Bring a glyph through `glyph` (a
direct registry import), through `name` from the whitelisted
registry, or bring your own; the well renders either. -->
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