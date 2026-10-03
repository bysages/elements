<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("breadcrumb");

import { useComponentMessages } from "../config-provider/messages";
import type { BreadcrumbProps } from "./props";

let { "aria-label": label, children, ...rest }: BreadcrumbProps = $props();
const messages = useComponentMessages();
</script>

<nav {...rest} aria-label={label ?? messages().breadcrumb.label} data-scope="breadcrumb" data-part="root">
  {@render children?.()}
</nav>
