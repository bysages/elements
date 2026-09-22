<script lang="ts">
import { renderHtml } from "@tanstack/markdown/html";

import { clickCodeCopy, decorateCodeCopy } from "./code-copy";

import type { ResponseProps } from "./props";

let {
  content,
  copyLabel = "Copy code",
  copiedLabel = "Copied",
  onclick,
  ...rest
}: ResponseProps = $props();

const html = $derived(renderHtml(content));

let root: HTMLDivElement | undefined;

// The markdown is one innerHTML string, rebuilt on every stream tick —
// the stamps go back on right after each patch, and a single
// delegated click serves them all.
$effect(() => {
  void html;
  if (root) decorateCodeCopy(root, copyLabel);
});

const handleClick = (event: MouseEvent) => {
  void clickCodeCopy(event, copyLabel, copiedLabel);
  onclick?.(event);
};
</script>

<!-- Markdown set on the paper. Rendering goes through
@tanstack/markdown, whose defaults leave raw HTML and executable links
inert — streaming-safe by construction. -->
<div
  {...rest}
  bind:this={root}
  data-scope="ai"
  data-part="response"
  onclick={handleClick}
>
  {@html html}
</div>
