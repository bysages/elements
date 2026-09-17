<script lang="ts">
import { provideLayout } from "./context";
import type { LayoutProps } from "./props";

let { sider, children, ...rest }: LayoutProps = $props();

provideLayout({ siderPlacement: () => sider });
</script>

<!-- The application skeleton: a full-height grid that holds the header
on top, the footer at the foot, and the flow between them. A declared
`sider` turns the columns around to meet whichever edge the rail stands
on. -->
<div {...rest} data-scope="layout" data-part="root" data-sider={sider}>
  {@render children?.()}
</div>
