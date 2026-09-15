<script lang="ts">
import type {TypographyPartProps} from "./props";

let { children, ...rest }: TypographyPartProps = $props();
</script>

<p {...rest} data-scope="typography" data-part="body">
  {@render children?.()}
</p>
