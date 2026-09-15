<script lang="ts">
import { renderHtml } from "@tanstack/markdown/html";
import type { ResponseProps } from "./props";

let { content, ...rest }: ResponseProps = $props();

const html = $derived(renderHtml(content));
</script>

<!-- Rendering goes through @tanstack/markdown, whose defaults leave raw
HTML and executable links inert — streaming-safe by construction. -->
<div {...rest} data-scope="ai" data-part="response">
  {@html html}
</div>
