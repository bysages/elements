import { injectComponentStyle } from "@bysages/core";
import { renderHtml } from "@tanstack/markdown/html";
import { createEffect, createMemo, onMount, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { clickCodeCopy, decorateCodeCopy } from "./code-copy";

export interface ResponseProps extends JSX.HTMLAttributes<HTMLDivElement> {
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

/** Markdown set on the paper. Rendering goes through
 * `@tanstack/markdown`, whose defaults leave raw HTML and executable
 * links inert — streaming-safe by construction. */
export function Response(props: ResponseProps) {
  const [own, rest] = splitProps(props, ["content", "highlighter", "copyLabel", "copiedLabel"]);
  const html = createMemo(() =>
    renderHtml(own.content, own.highlighter ? { highlighter: own.highlighter } : undefined),
  );
  let root: HTMLDivElement | undefined;

  // The markdown is one innerHTML string, rebuilt on every stream
  // tick — the stamps go back on right after each patch, and a single
  // delegated click serves them all.
  onMount(() =>
    createEffect(() => {
      void html();
      if (root) decorateCodeCopy(root, own.copyLabel ?? "Copy code");
    }),
  );

  const onClick: JSX.EventHandler<HTMLDivElement, MouseEvent> = (event) => {
    void clickCodeCopy(event, own.copyLabel ?? "Copy code", own.copiedLabel ?? "Copied");
  };

  return (
    <div
      {...rest}
      ref={(el) => (root = el)}
      data-scope="ai"
      data-part="response"
      onClick={onClick}
      innerHTML={html()}
    />
  );
}

injectComponentStyle("ai");

export { Response as AiResponse };
