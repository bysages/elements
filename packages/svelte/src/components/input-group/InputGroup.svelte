<script lang="ts">
import type { InputGroupProps } from "./props";

let { children, ...rest }: InputGroupProps = $props();
</script>

<!-- Merged controls: the Root draws the single hairline and carries the
group's focus halo. Put our Input (or Textarea) inside and its own
border and halo step aside in favor of the group's; the stylesheet does
the merging, this wrapper adds no visuals of its own. -->
<div {...rest} data-scope="input-group" data-part="root">
  {@render children?.()}
</div>
