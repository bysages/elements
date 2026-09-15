import {
  createHighlighter,
} from "@tanstack/highlight/core";
import { createTanStackMarkdownHighlighter } from "@tanstack/highlight/markdown";
import { css } from "@tanstack/highlight/languages/css";
import { diff } from "@tanstack/highlight/languages/diff";
import { html } from "@tanstack/highlight/languages/html";
import { js } from "@tanstack/highlight/languages/js";
import { json } from "@tanstack/highlight/languages/json";
import { jsx } from "@tanstack/highlight/languages/jsx";
import { markdown } from "@tanstack/highlight/languages/markdown";
import { python } from "@tanstack/highlight/languages/python";
import { shell } from "@tanstack/highlight/languages/shell";
import { sql } from "@tanstack/highlight/languages/sql";
import { svelte } from "@tanstack/highlight/languages/svelte";
import { ts } from "@tanstack/highlight/languages/ts";
import { tsx } from "@tanstack/highlight/languages/tsx";
import { vue } from "@tanstack/highlight/languages/vue";
import { yaml } from "@tanstack/highlight/languages/yaml";

/** The languages this site documents, registered selectively so the
 * engine stays a few kilobytes. */
export const highlighter = createHighlighter({
  languages: [
    css,
    diff,
    html,
    js,
    json,
    jsx,
    markdown,
    python,
    shell,
    sql,
    svelte,
    ts,
    tsx,
    vue,
    yaml,
  ],
});

/** Fence spellings that differ from the engine's language names. */
const ALIASES: Record<string, string> = {
  bash: "shell",
  md: "markdown",
  mdc: "vue",
  sh: "shell",
  yml: "yaml",
};

function resolveLang(lang?: string) {
  return lang ? (ALIASES[lang] ?? lang) : undefined;
}

/** Highlight for direct rendering — the full `<pre class="th-code">`
 * markup, for source shown outside markdown. */
export function highlight(code: string, lang?: string) {
  return highlighter.highlight(code, { lang: resolveLang(lang) });
}

/** Inner token markup for renderers that own their `<pre><code>` —
 * the prose code blocks and the assistant's fenced code. Synchronous,
 * so server and client render the same tree. */
const fenceHighlighter = createTanStackMarkdownHighlighter(highlighter);

export function highlightFence(code: string, lang?: string) {
  return fenceHighlighter(code, resolveLang(lang));
}
