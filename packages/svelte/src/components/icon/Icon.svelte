<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("icon");

  import { getIcon } from "@bysages/icons";
  import type { IconProps } from "./props";

  let { size = "inherit", label, name, children, ...rest }: IconProps = $props();

  const glyph = name && children == null ? getIcon(name) : undefined;
  if (name && children == null && !glyph) {
    console.error(
      `[icons] unknown icon name "${name}" — extend packages/icons/icons.config.json and rerun the generator`,
    );
  }
</script>

<!-- The inkwell: a standard box that keeps any inline svg at its
optical measure and in the text's own ink — the icon carries no
pigment and no size of its own. Bring a glyph through `name` from
the registry, or bring your own; the well renders either. -->
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
  {:else if glyph}
    <svg viewBox="0 0 {glyph.width ?? 24} {glyph.height ?? 24}" fill="currentColor" aria-hidden="true">
      {@html glyph.body}
    </svg>
  {/if}
</span>
