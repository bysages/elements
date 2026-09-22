import { injectComponentStyle } from "@bysages/core";
import { renderHtml } from "@tanstack/markdown/html";
import type { PropType } from "vue";
import { computed, defineComponent, h, ref, watchPostEffect } from "vue";

import { clickCodeCopy, decorateCodeCopy } from "./code-copy";

/** Markdown set on the paper. Rendering goes through
 * `@tanstack/markdown`, whose defaults leave raw HTML and executable
 * links inert — streaming-safe by construction. An optional
 * highlighter re-inks fenced code; the component stays agnostic about
 * which engine provides it. */
export const Response = defineComponent({
  name: "AiResponse",
  props: {
    /** The markdown text to set on the paper — streamed in freely; raw
     * HTML and executable links stay inert. */
    content: { type: String, required: true },
    /** Optional code-highlighting function re-inking fenced blocks; the
     * component stays agnostic about which engine provides it. */
    highlighter: {
      type: Function as PropType<(code: string, lang?: string) => string>,
      default: undefined,
    },
    /** The copy stamp's accessible name before the copy lands. */
    copyLabel: { type: String, default: "Copy code" },
    /** The copy stamp's accessible name once the text has landed. */
    copiedLabel: { type: String, default: "Copied" },
  },
  setup(props) {
    const html = computed(() =>
      renderHtml(props.content, props.highlighter ? { highlighter: props.highlighter } : undefined),
    );
    const root = ref<HTMLElement | null>(null);

    // The markdown is one innerHTML string, rebuilt on every stream
    // tick — the stamps go back on right after each patch, and a
    // single delegated click serves them all.
    watchPostEffect(() => {
      void html.value;
      void props.copyLabel;
      if (root.value) decorateCodeCopy(root.value, props.copyLabel);
    });

    const onClick = (event: MouseEvent) => {
      void clickCodeCopy(event, props.copyLabel, props.copiedLabel);
    };

    return () =>
      h("div", {
        ref: root,
        "data-scope": "ai",
        "data-part": "response",
        innerHTML: html.value,
        onClick,
      });
  },
});

injectComponentStyle("ai");

export { Response as AiResponse };
