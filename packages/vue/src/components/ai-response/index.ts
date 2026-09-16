import { injectComponentStyle } from "@bysages/core";
import { renderHtml } from "@tanstack/markdown/html";
import type { PropType } from "vue";
import { computed, defineComponent, h } from "vue";

/** Markdown set on the paper. Rendering goes through
 * `@tanstack/markdown`, whose defaults leave raw HTML and executable
 * links inert — streaming-safe by construction. An optional
 * highlighter re-inks fenced code; the component stays agnostic about
 * which engine provides it. */
export const Response = defineComponent({
  name: "AiResponse",
  props: {
    /** The markdown text to set on the paper — streamed in freely;
     * raw HTML and executable links stay inert. */
    content: { type: String, required: true },
    /** Optional code-highlighting function re-inking fenced blocks;
     * the component stays agnostic about which engine provides it. */
    highlighter: {
      type: Function as PropType<(code: string, lang?: string) => string>,
      default: undefined,
    },
  },
  setup(props) {
    const html = computed(() =>
      renderHtml(props.content, props.highlighter ? { highlighter: props.highlighter } : undefined),
    );
    return () => h("div", { "data-scope": "ai", "data-part": "response", innerHTML: html.value });
  },
});

injectComponentStyle("ai");

export { Response as AiResponse };
