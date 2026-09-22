import { injectComponentStyle } from "@bysages/core";
import { renderHtml } from "@tanstack/markdown/html";
import type { HTMLAttributes, MouseEvent } from "react";
import { useEffect, useRef } from "react";

import { clickCodeCopy, decorateCodeCopy } from "./code-copy";

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
  /** The copy stamp's accessible name before the copy lands. */
  copyLabel?: string;
  /** The copy stamp's accessible name once the text has landed. */
  copiedLabel?: string;
}

export function Response({
  content,
  highlighter,
  copyLabel = "Copy code",
  copiedLabel = "Copied",
  ...rest
}: ResponseProps) {
  const root = useRef<HTMLDivElement>(null);

  // The markdown is one innerHTML string, rebuilt on every stream
  // tick — the stamps go back on right after each patch, and a single
  // delegated click serves them all.
  useEffect(() => {
    const host = root.current;
    if (host) decorateCodeCopy(host, copyLabel);
  }, [content, highlighter, copyLabel]);

  const onClick = (event: MouseEvent<HTMLDivElement>) => {
    void clickCodeCopy(event.nativeEvent, copyLabel, copiedLabel);
  };

  return (
    <div
      {...rest}
      ref={root}
      data-scope="ai"
      data-part="response"
      onClick={onClick}
      dangerouslySetInnerHTML={{
        __html: renderHtml(content, highlighter ? { highlighter } : undefined),
      }}
    />
  );
}

injectComponentStyle("ai");

export { Response as AiResponse };
