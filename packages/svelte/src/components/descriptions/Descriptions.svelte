<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("descriptions");

import type { DescriptionsRootProps } from "./props";

let { layout = "horizontal", bordered = false, column = 1, children, ...rest }: DescriptionsRootProps = $props();
</script>

<dl
  {...rest}
  style:--bs-desc-columns={String(column)}
  data-scope="descriptions"
  data-part="root"
  data-layout={layout}
  data-bordered={bordered || undefined}
>
  {@render children?.()}
</dl>
