import { injectComponentStyle } from "@bysages/core";
import { renderHtml } from "@tanstack/markdown/html";
import type { HTMLAttributes } from "react";

/** Markdown set on the paper. Rendering goes through
 * `@tanstack/markdown`, whose defaults leave raw HTML and executable
 * links inert — streaming-safe by construction. An optional
 * highlighter re-inks fenced code; the component stays agnostic about
 * which engine provides it. */
export interface ResponseProps extends HTMLAttributes<HTMLDivElement> {
  /** The markdown text to set on the paper — streamed in freely; raw
   * HTML and executable links stay inert. */
  content: string;
  /** Optional code-highlighting function re-inking fenced blocks; the
   * component stays agnostic about which engine provides it. */
  highlighter?: (code: string, lang?: string) => string;
}

export function Response({ content, highlighter, ...rest }: ResponseProps) {
  return (
    <div
      {...rest}
      data-scope="ai"
      data-part="response"
      dangerouslySetInnerHTML={{
        __html: renderHtml(content, highlighter ? { highlighter } : undefined),
      }}
    />
  );
}

injectComponentStyle("ai");

export { Response as AiResponse };
