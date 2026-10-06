import { injectComponentStyle } from "@bysages/core";
import { renderHtml } from "@tanstack/markdown/html";
import { createEffect, createMemo, onMount, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { withSelfRoot } from "../../internal/family";
import { useComponentMessages } from "../config-provider/use-component-messages";
import { clickCodeCopy, decorateCodeCopy } from "./code-copy";
import { wrapResponseTables } from "./tables";

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
export const Response = withSelfRoot(function Response(props: ResponseProps) {
  injectComponentStyle("ai");
  const [own, rest] = splitProps(props, ["content", "highlighter", "copyLabel", "copiedLabel"]);
  const messages = useComponentMessages();
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
      if (root) decorateCodeCopy(root, own.copyLabel ?? messages().ai.copyCode);
      if (root) wrapResponseTables(root);
    }),
  );

  const onClick: JSX.EventHandler<HTMLDivElement, MouseEvent> = (event) => {
    void clickCodeCopy(
      event,
      own.copyLabel ?? messages().ai.copyCode,
      own.copiedLabel ?? messages().ai.copied,
    );
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
});
export { Response as AiResponse };
