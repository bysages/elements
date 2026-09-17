<script lang="ts">
import { Button } from "../button";
import type { ActionProps } from "./props";

let { label, children, ...rest }: ActionProps = $props();
</script>

<!-- A quiet icon button — copy, retry, thumbs. The label names it to
assistive tech and as the hover title. The control itself is the shared
Button in its ghost register. -->
<Button variant="ghost" size="sm" square aria-label={label} title={label} {...rest}>
  {@render children?.()}
</Button>
