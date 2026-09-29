<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("descriptions");

import type { DescriptionsItemProps } from "./props";

let { span = 1, children, ...rest }: DescriptionsItemProps = $props();
</script>

<div
  {...rest}
  style:--bs-desc-span={String(span * 2)}
  data-scope="descriptions"
  data-part="item"
>
  {@render children?.()}
</div>
