import { injectComponentStyle } from "@bysages/core";
import { renderHtml } from "@tanstack/markdown/html";
import { createMemo, splitProps } from "solid-js";
import type { JSX } from "solid-js";

export interface ResponseProps extends JSX.HTMLAttributes<HTMLDivElement> {
  /** The markdown text to set on the paper — streamed in freely;
   * raw HTML and executable links stay inert. */
  content: string;
  /** Optional code-highlighting function re-inking fenced blocks;
   * the component stays agnostic about which engine provides it. */
  highlighter?: (code: string, lang?: string) => string;
}

/** Markdown set on the paper. Rendering goes through
 * `@tanstack/markdown`, whose defaults leave raw HTML and executable
 * links inert — streaming-safe by construction. */
export function Response(props: ResponseProps) {
  const [own, rest] = splitProps(props, ["content", "highlighter"]);
  const html = createMemo(() =>
    renderHtml(own.content, own.highlighter ? { highlighter: own.highlighter } : undefined),
  );
  return <div {...rest} data-scope="ai" data-part="response" innerHTML={html()} />;
}

injectComponentStyle("ai");

export { Response as AiResponse };
