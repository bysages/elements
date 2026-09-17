<script lang="ts">
import { provideConfig } from "./context";
import type { ConfigProviderProps } from "./props";

let { density, accent, dir, locale, lang, children, ...rest }: ConfigProviderProps = $props();

provideConfig({
  get density() {
    return density;
  },
  get accent() {
    return accent;
  },
  get dir() {
    return dir;
  },
  get locale() {
    return locale;
  },
});
</script>

<!-- The declarative host for global configuration: one element that
both carries the token layer's attributes — `[data-density]` and
`[data-accent]` fire on any element — and provides the same values to
descendants through `useConfig`, so interactive behavior (formatting,
messages) and visual theming stay one decision. -->
<div
  {...rest}
  data-scope="config-provider"
  data-part="root"
  data-density={density}
  data-accent={accent}
  {dir}
  lang={locale ?? lang}
>
  {@render children?.()}
</div>
