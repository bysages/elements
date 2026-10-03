<script lang="ts">
import { injectComponentStyle } from "@bysages/core";
injectComponentStyle("ai");

import { renderHtml } from "@tanstack/markdown/html";

import { useComponentMessages } from "../config-provider/messages";
import { clickCodeCopy, decorateCodeCopy } from "./code-copy";
import { wrapResponseTables } from "./tables";

import type { ResponseProps } from "./props";

let {
  content,
  highlighter,
  copyLabel,
  copiedLabel,
  onclick,
  ...rest
}: ResponseProps = $props();

const messages = useComponentMessages();
const html = $derived(renderHtml(content, highlighter ? { highlighter } : undefined));
const copyText = $derived(copyLabel ?? messages().ai.copyCode);
const copiedText = $derived(copiedLabel ?? messages().ai.copied);


let root: HTMLDivElement | undefined;

// The markdown is one innerHTML string, rebuilt on every stream tick —
// the stamps go back on right after each patch, and a single
// delegated click serves them all.
$effect(() => {
  void html;
  if (root) decorateCodeCopy(root, copyText);
  if (root) wrapResponseTables(root);
});

const handleClick = (event: MouseEvent) => {
  void clickCodeCopy(event, copyText, copiedText);
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
