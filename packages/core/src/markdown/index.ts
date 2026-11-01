import { renderHtml } from "@tanstack/markdown/html";

import { mermaidExtension } from "./mermaid";
import type { MarkdownRenderOptions } from "./types";

export type { MarkdownRenderOptions } from "./types";

/** Render trusted Markdown author input to HTML. Raw HTML and executable
 * links stay inert; Mermaid diagrams are enabled by default so AI prose
 * can carry them without each framework growing its own renderer. */
export function renderMarkdown(source: string, options?: MarkdownRenderOptions): string {
  return renderHtml(source, {
    highlighter: options?.highlighter,
    extensions: options?.mermaid === false ? [] : [mermaidExtension()],
  });
}
