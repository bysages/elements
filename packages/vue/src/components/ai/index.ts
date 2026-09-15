import { injectComponentStyle } from "@bysages/core";
import { renderHtml } from "@tanstack/markdown/html";
import type { PropType, SetupContext } from "vue";
import { computed, defineComponent, h } from "vue";

import { Button } from "../button";
import { Collapsible } from "../collapsible";
import { Field } from "../field";

/** A conversation column: Root is the log, Message carries a role, and
 * the speaking parts — Response, Reasoning, Tool, Sources — part the
 * stream. The interactive folds are the shared Collapsible wearing a
 * `data-ai` marker, so the machine work is never ours. Parts stay
 * agnostic of any client; consumers map their message format (e.g. the
 * `UIMessage` parts re-exported below) onto these primitives. */
function part(name: string, tag: string, extra: Record<string, unknown> = {}, fallback?: string) {
  return defineComponent({
    name: "Ai" + name,
    setup(_, ctx: SetupContext) {
      return () =>
        h(
          tag,
          {
            ...extra,
            ...ctx.attrs,
            "data-scope": "ai",
            "data-part": name.toLowerCase(),
          },
          ctx.slots.default?.() ?? fallback,
        );
    },
  });
}

const Conversation = part("Conversation", "div", { role: "log", "aria-label": "Conversation" });
const MessageContent = part("Content", "div");
const Sources = part("Sources", "ol");
const Actions = part("Actions", "div");
const Loader = part("Loader", "span", { role: "status", "aria-label": "Loading" });

/** The folding chevron the shared indicator turns. */
const chevron = () =>
  h("svg", { viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true" }, [
    h("path", {
      d: "M6 4l4 4-4 4",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
    }),
  ]);

/** Whose stroke this is — the user's words sit in a recessed bubble,
 * the assistant speaks flat on the paper. */
const Message = defineComponent({
  name: "AiMessage",
  props: {
    role: {
      type: String as PropType<"user" | "assistant" | "system">,
      default: "assistant",
    },
  },
  setup(props, ctx: SetupContext) {
    return () =>
      h(
        "article",
        {
          ...ctx.attrs,
          "data-scope": "ai",
          "data-part": "message",
          "data-role": props.role,
        },
        ctx.slots.default?.(),
      );
  },
});

/** Markdown set on the paper. Rendering goes through
 * `@tanstack/markdown`, whose defaults leave raw HTML and executable
 * links inert — streaming-safe by construction. An optional
 * highlighter re-inks fenced code; the component stays agnostic about
 * which engine provides it. */
const Response = defineComponent({
  name: "AiResponse",
  props: {
    content: { type: String, required: true },
    highlighter: {
      type: Function as PropType<(code: string, lang?: string) => string>,
      default: undefined,
    },
  },
  setup(props) {
    const html = computed(() =>
      renderHtml(
        props.content,
        props.highlighter ? { highlighter: props.highlighter } : undefined,
      ),
    );
    return () => h("div", { "data-scope": "ai", "data-part": "response", innerHTML: html.value });
  },
});

/** The model's thought, folded by the shared collapsible in its quiet
 * register: bare ink for a trigger, the thought on one hairline. */
const Reasoning = defineComponent({
  name: "AiReasoning",
  props: {
    label: { type: String, default: "Thinking" },
  },
  setup(props, ctx: SetupContext) {
    return () =>
      h(Collapsible.Root, { ...ctx.attrs, "data-ai": "reasoning" }, () => [
        h(Collapsible.Trigger, () => [h("span", props.label), h(Collapsible.Indicator, chevron)]),
        h(Collapsible.Content, () =>
          h("div", { "data-scope": "ai", "data-part": "reasoning-content" }, ctx.slots.default?.()),
        ),
      ]);
  },
});

/** A tool call: the shared collapsible as the vessel — the name it was
 * reached by and the state it reached in on the trigger, its input and
 * output folded inside. */
const Tool = defineComponent({
  name: "AiTool",
  props: {
    name: { type: String, required: true },
    status: { type: String as PropType<"pending" | "running" | "completed" | "error"> },
  },
  setup(props, ctx: SetupContext) {
    return () => {
      const status = props.status;
      return h(
        Collapsible.Root,
        { ...ctx.attrs, "data-ai": "tool", ...(status ? { "data-status": status } : {}) },
        () => [
          h(Collapsible.Trigger, () => [
            h("span", props.name),
            status
              ? h(
                  "span",
                  { "data-scope": "ai", "data-part": "tool-status" },
                  status.charAt(0).toUpperCase() + status.slice(1),
                )
              : null,
            h(Collapsible.Indicator, chevron),
          ]),
          h(Collapsible.Content, () => {
            const body = [
              ...(ctx.slots.input
                ? [
                    h("span", { "data-scope": "ai", "data-part": "tool-label" }, "Input"),
                    h("pre", ctx.slots.input()),
                  ]
                : []),
              ...(ctx.slots.output
                ? [
                    h("span", { "data-scope": "ai", "data-part": "tool-label" }, "Output"),
                    h("pre", ctx.slots.output()),
                  ]
                : []),
            ];
            return h("div", { "data-scope": "ai", "data-part": "tool-body" }, body);
          }),
        ],
      );
    };
  },
});

/** One place the ink came from; href and the rest ride the anchor. */
const Source = defineComponent({
  name: "AiSource",
  props: {
    href: { type: String, required: true },
  },
  setup(props, ctx: SetupContext) {
    return () =>
      h("li", { "data-scope": "ai", "data-part": "source" }, [
        h(
          "a",
          { ...ctx.attrs, href: props.href, target: "_blank", rel: "noreferrer" },
          ctx.slots.default?.() ?? props.href,
        ),
      ]);
  },
});

/** A quiet icon button — copy, retry, thumbs. The label names it to
 * assistive tech and as the hover title. The control itself is the
 * shared Button in its ghost register. */
const Action = defineComponent({
  name: "AiAction",
  props: {
    label: { type: String, required: true },
  },
  setup(props, ctx: SetupContext) {
    return () =>
      h(
        Button,
        {
          variant: "ghost",
          size: "sm",
          square: true,
          "aria-label": props.label,
          title: props.label,
        },
        ctx.slots.default?.(),
      );
  },
});

/** A seal-cut button proposing the next stroke; selection hands back
 * the prompt. The shared Button in its outline register. */
const Suggestion = defineComponent({
  name: "AiSuggestion",
  props: {
    prompt: { type: String, required: true },
  },
  emits: {
    select: (prompt: string) => true,
  },
  setup(props, { emit }) {
    return () =>
      h(
        Button,
        { variant: "outline", size: "sm", onClick: () => emit("select", props.prompt) },
        props.prompt,
      );
  },
});

/** The prompt vessel: the shared field textarea — self-growing on the
 * machine's autoresize — over a footer row carrying the submit seal.
 * Controlled — bind `v-model` and take the text on `submit`. Enter
 * sends; Shift+Enter breaks the line. */
const PromptInput = defineComponent({
  name: "AiPromptInput",
  props: {
    modelValue: { type: String, default: "" },
    placeholder: { type: String, default: "Send a message" },
    disabled: { type: Boolean, default: false },
  },
  emits: {
    "update:modelValue": (value: string) => true,
    submit: (value: string) => true,
  },
  setup(props, { emit, attrs }: SetupContext) {
    const submit = () => {
      const value = props.modelValue.trim();
      if (!value || props.disabled) return;
      emit("submit", value);
      emit("update:modelValue", "");
    };

    return () =>
      h(
        "form",
        {
          ...attrs,
          "data-scope": "ai",
          "data-part": "prompt",
          onSubmit: (event: Event) => {
            event.preventDefault();
            submit();
          },
        },
        [
          h(Field.Root as any, () =>
            h(Field.Textarea as any, {
              autoresize: true,
              rows: 1,
              modelValue: props.modelValue,
              placeholder: props.placeholder,
              disabled: props.disabled,
              "onUpdate:modelValue": (value: string) => emit("update:modelValue", value),
              onKeydown: (event: KeyboardEvent) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  submit();
                }
              },
            }),
          ),
          h("div", { "data-scope": "ai", "data-part": "prompt-footer" }, [
            h(
              Button,
              {
                variant: "solid",
                size: "sm",
                square: true,
                type: "submit",
                "aria-label": "Send",
                disabled: props.disabled || !props.modelValue.trim(),
              },
              [
                h(
                  "svg",
                  {
                    viewBox: "0 0 16 16",
                    width: 14,
                    height: 14,
                    "aria-hidden": "true",
                    fill: "none",
                    stroke: "currentColor",
                    "stroke-width": "1.5",
                    "stroke-linecap": "square",
                  },
                  [h("path", { d: "M8 13V3M3.5 7.5 8 3l4.5 4.5" })],
                ),
              ],
            ),
          ]),
        ],
      );
  },
});

export const Ai = Object.assign(Conversation, {
  Conversation,
  Message,
  MessageContent,
  Response,
  Reasoning,
  Tool,
  Sources,
  Source,
  Actions,
  Action,
  Suggestion,
  PromptInput,
  Loader,
});

injectComponentStyle("ai");

export type {
  DataUIPart,
  FileUIPart,
  ReasoningUIPart,
  SourceDocumentUIPart,
  SourceUrlUIPart,
  StepStartUIPart,
  TextUIPart,
  ToolUIPart,
  UIMessage,
  UIMessagePart,
} from "ai";
