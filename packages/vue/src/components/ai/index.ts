import { injectComponentStyle } from "@bysages/core";
import { renderHtml } from "@tanstack/markdown/html";
import type { PropType, SetupContext } from "vue";
import { computed, defineComponent, h, ref, watch } from "vue";

import { Button } from "../button";

/** A conversation column: Root is the log, Message carries a role, and
 * the speaking parts — Response, Reasoning, Tool, Sources — part the
 * stream. Parts stay agnostic of any client; consumers map their
 * message format (e.g. the `UIMessage` parts re-exported below) onto
 * these primitives. */
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
 * links inert — streaming-safe by construction. */
const Response = defineComponent({
  name: "AiResponse",
  props: {
    content: { type: String, required: true },
  },
  setup(props) {
    const html = computed(() => renderHtml(props.content));
    return () => h("div", { "data-scope": "ai", "data-part": "response", innerHTML: html.value });
  },
});

/** The model's thought: a native disclosure, so folding costs no
 * script. Pass the `open` attribute to start unfolded. */
const Reasoning = defineComponent({
  name: "AiReasoning",
  props: {
    label: { type: String, default: "Thinking" },
  },
  setup(props, ctx: SetupContext) {
    const content = ctx.slots.default?.();
    return () =>
      h(
        "details",
        { ...ctx.attrs, "data-scope": "ai", "data-part": "reasoning" },
        content
          ? [
              h("summary", props.label),
              h("div", { "data-scope": "ai", "data-part": "reasoning-content" }, content),
            ]
          : h("summary", props.label),
      );
  },
});

/** A tool call: the name it was reached by, the state it reached in,
 * and — folded inside — its input and output. */
const Tool = defineComponent({
  name: "AiTool",
  props: {
    name: { type: String, required: true },
    status: { type: String as PropType<"pending" | "running" | "completed" | "error"> },
  },
  setup(props, ctx: SetupContext) {
    return () => {
      const status = props.status;
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
      return h(
        "details",
        {
          ...ctx.attrs,
          "data-scope": "ai",
          "data-part": "tool",
          ...(status ? { "data-status": status } : {}),
        },
        [
          h("summary", [
            h("span", props.name),
            status
              ? h(
                  "span",
                  { "data-scope": "ai", "data-part": "tool-status" },
                  status.charAt(0).toUpperCase() + status.slice(1),
                )
              : null,
          ]),
          h("div", { "data-scope": "ai", "data-part": "tool-body" }, body),
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
        { variant: "ghost", size: "sm", "aria-label": props.label, title: props.label },
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

/** The prompt vessel: a bare, self-growing textarea and the submit
 * seal. Controlled — bind `v-model` and take the text on `submit`.
 * Enter sends; Shift+Enter breaks the line. */
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
    const field = ref<HTMLTextAreaElement | null>(null);

    const grow = () => {
      const el = field.value;
      if (!el) return;
      el.style.blockSize = "auto";
      el.style.blockSize = `${el.scrollHeight}px`;
    };

    const submit = () => {
      const value = props.modelValue.trim();
      if (!value || props.disabled) return;
      emit("submit", value);
      emit("update:modelValue", "");
    };

    watch(() => props.modelValue, grow);

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
          h("textarea", {
            ref: field,
            "data-scope": "ai",
            "data-part": "prompt-textarea",
            rows: 1,
            value: props.modelValue,
            placeholder: props.placeholder,
            disabled: props.disabled,
            onInput: (event: Event) => {
              emit("update:modelValue", (event.target as HTMLTextAreaElement).value);
              grow();
            },
            onKeydown: (event: KeyboardEvent) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submit();
              }
            },
          }),
          h(
            Button,
            {
              variant: "solid",
              size: "sm",
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
