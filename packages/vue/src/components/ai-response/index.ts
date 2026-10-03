import { injectComponentStyle } from "@bysages/core";
import { renderHtml } from "@tanstack/markdown/html";
import type { PropType } from "vue";
import { computed, defineComponent, h, ref, watchPostEffect } from "vue";

import { useComponentMessages } from "../../internal/messages";
import { clickCodeCopy, decorateCodeCopy } from "./code-copy";

/** Wide tables ride a scrolling lane instead of bursting the column.
 * The lane is a plain div: the table-as-scroll-container form is what
 * ate the mouse wheel over plain tables. It only claims
 * `overflow-x: auto` once its table actually overflows. The data
 * attribute doubles as the style hook and the idempotence guard, so
 * it can run after every stream patch. */
const lanes = new Set<HTMLElement>();
let laneObserver: ResizeObserver | undefined;

/** A lane's verdict must follow its box — the panel around it can
 * resize at any moment, so each lane stays observed and re-decided
 * whenever its width changes. */
function watchLane(lane: HTMLElement): void {
  if (lanes.has(lane)) return;
  lanes.add(lane);
  laneObserver ??= new ResizeObserver(() => {
    for (const lane of lanes) {
      if (!lane.isConnected) {
        laneObserver!.unobserve(lane);
        lanes.delete(lane);
        continue;
      }
      lane.toggleAttribute("data-scrollable", lane.scrollWidth > lane.clientWidth);
    }
  });
  laneObserver.observe(lane);
}

function wrapResponseTables(root: HTMLElement): void {
  for (const table of root.querySelectorAll("table")) {
    if (table.parentElement?.hasAttribute("data-table-scroll")) continue;
    const lane = document.createElement("div");
    lane.setAttribute("data-table-scroll", "");
    table.replaceWith(lane);
    lane.append(table);
  }
  for (const lane of root.querySelectorAll<HTMLElement>("[data-table-scroll]")) {
    lane.toggleAttribute("data-scrollable", lane.scrollWidth > lane.clientWidth);
    watchLane(lane);
  }
}

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
    copyLabel: { type: String, default: undefined },
    /** The copy stamp's accessible name once the text has landed. */
    copiedLabel: { type: String, default: undefined },
  },
  setup(props) {
    injectComponentStyle("ai");
    const messages = useComponentMessages();
    const copyLabel = computed(() => props.copyLabel ?? messages.value.ai.copyCode);
    const copiedLabel = computed(() => props.copiedLabel ?? messages.value.ai.copied);

    const html = computed(() =>
      renderHtml(props.content, props.highlighter ? { highlighter: props.highlighter } : undefined),
    );
    const root = ref<HTMLElement | null>(null);

    // The markdown is one innerHTML string, rebuilt on every stream
    // tick — the stamps go back on right after each patch, and a
    // single delegated click serves them all.
    watchPostEffect(() => {
      void html.value;
      void copyLabel.value;
      if (root.value) decorateCodeCopy(root.value, copyLabel.value);
      if (root.value) wrapResponseTables(root.value);
    });

    const onClick = (event: MouseEvent) => {
      void clickCodeCopy(event, copyLabel.value, copiedLabel.value);
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
export { Response as AiResponse };
