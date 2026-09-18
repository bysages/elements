<script lang="ts">
import type { ListProps } from "./props";

let { bordered = false, hoverable = false, children, ...rest }: ListProps = $props();
</script>

<ul
  {...rest}
  data-scope="list"
  data-part="root"
  data-bordered={bordered || undefined}
  data-hoverable={hoverable || undefined}
>
  {@render children?.()}
</ul>
