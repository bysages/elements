import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h, nextTick, ref, watch, type PropType } from "vue";

import { withSelfRoot } from "../../internal/family";
import { useComponentMessages } from "../../internal/messages";

/** A quiet console: the transcript above, the prompt line below. The
 * component owns only the reading and the caret — each entered line
 * leaves as an event, and the caller answers through the lines prop,
 * so history stays theirs to shape. */
export const Terminal = withSelfRoot(
  defineComponent({
    name: "Terminal",
    props: {
      /** The transcript, oldest line first. */
      lines: { type: Array as PropType<string[]>, default: () => [] },
      /** The sigil at the head of the entry line. */
      prompt: { type: String, default: "$" },
      placeholder: { type: String, default: undefined },
      label: { type: String, default: undefined },
    },
    emits: ["command"],
    setup(props, ctx: SetupContext) {
      injectComponentStyle("terminal");
      const messages = useComponentMessages();

      const draft = ref("");
      const scroll = ref<HTMLElement | null>(null);
      watch(
        () => props.lines.length,
        async () => {
          await nextTick();
          scroll.value?.scrollTo({ top: scroll.value.scrollHeight });
        },
      );
      function submit() {
        const text = draft.value.trim();
        if (!text) return;
        draft.value = "";
        ctx.emit("command", text);
      }
      return () =>
        h(
          "div",
          {
            ...ctx.attrs,
            role: "log",
            "aria-label": props.label ?? undefined,
            "data-scope": "terminal",
            "data-part": "root",
          },
          [
            h(
              "div",
              { ref: scroll, "data-scope": "terminal", "data-part": "scroll" },
              props.lines.map((line, index) =>
                h("div", { key: index, "data-scope": "terminal", "data-part": "line" }, line),
              ),
            ),
            h("div", { "data-scope": "terminal", "data-part": "entry" }, [
              h(
                "span",
                { "data-scope": "terminal", "data-part": "sigil", "aria-hidden": true },
                props.prompt,
              ),
              h("input", {
                "data-scope": "terminal",
                "data-part": "input",
                value: draft.value,
                placeholder: props.placeholder ?? undefined,
                "aria-label": props.label ?? messages.value.terminal.commandLine,
                spellcheck: false,
                autocomplete: "off",
                onInput: (event: InputEvent) =>
                  (draft.value = (event.target as HTMLInputElement).value),
                onKeydown: (event: KeyboardEvent) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    submit();
                  }
                },
              }),
            ]),
          ],
        );
    },
  }),
);
