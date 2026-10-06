import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h, onMounted, onUnmounted, ref } from "vue";

import { defineFamily, withSelfRoot } from "../../internal/family";
import { useComponentMessages } from "../../internal/messages";
import { Action } from "../ai-action";
import { Message } from "../ai-message";
import { PromptInput } from "../ai-prompt-input";
import { Reasoning } from "../ai-reasoning";
import { Response } from "../ai-response";
import { AiSource as Source, AiSources as Sources } from "../ai-source";
import { Suggestion } from "../ai-suggestion";
import { Tool } from "../ai-tool";

/** A conversation column: Root is the log, Message carries a role, and
 * the speaking parts — Response, Reasoning, Tool, Sources — part the
 * stream. The interactive folds are the shared Collapsible wearing a
 * `data-ai` marker, so the machine work is never ours. Parts stay
 * agnostic of any client; consumers map their message format (e.g. the
 * `UIMessage` parts re-exported here) onto these primitives. */
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

function part(name: string, tag: string, extra: Record<string, unknown> = {}, fallback?: string) {
  return defineComponent({
    name: "Ai" + name,
    setup(_, ctx: SetupContext) {
      injectComponentStyle("ai");

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

/** The log itself: the column every stroke lands in, a landmark to
 * screen readers. While the reply streams, the log follows its growth —
 * but only while the reader rests at the bottom edge. Climb up to reread
 * a thought and the stream stops yanking the view back down; return to
 * the bottom and the follow resumes. */
export const AiConversation = defineComponent({
  name: "AiConversation",
  props: {
    /** Follow the stream's growth while the reader rests at the bottom. */
    autoScroll: { type: Boolean, default: true },
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("ai");
    const messages = useComponentMessages();
    const { "aria-label": consumerLabel, ...rootAttrs } = ctx.attrs;

    const el = ref<HTMLElement | null>(null);
    let observer: MutationObserver | undefined;
    // The follow decision reads the pre-growth position: a scroll event
    // can only come from the reader (or our own follow), so the flag is
    // always settled before the next stream stroke lands.
    let pinned = true;

    onMounted(() => {
      const node = el.value;
      if (!node || !props.autoScroll) return;
      node.addEventListener(
        "scroll",
        () => {
          pinned = node.scrollHeight - node.scrollTop - node.clientHeight < 96;
        },
        { passive: true },
      );
      observer = new MutationObserver(() => {
        if (pinned) node.scrollTop = node.scrollHeight;
      });
      observer.observe(node, { childList: true, subtree: true, characterData: true });
    });
    onUnmounted(() => observer?.disconnect());

    return () =>
      h(
        "div",
        {
          ref: el,
          role: "log",
          ...rootAttrs,
          "aria-label": consumerLabel ?? messages.value.ai.conversation,
          "data-scope": "ai",
          "data-part": "conversation",
        },
        ctx.slots.default?.(),
      );
  },
});

/** The bubble's inner measure — content that belongs to neither side
 * specifically. */
export const AiContent = withSelfRoot(part("Content", "div"));

/** The quiet row under a message — copy, retry, feedback. */
export const AiActions = withSelfRoot(part("Actions", "div"));

/** The while-it-works whisper for the in-flight turns. */
export const AiLoader = withSelfRoot(
  defineComponent({
    name: "AiLoader",
    setup(_, ctx: SetupContext) {
      injectComponentStyle("ai");
      const messages = useComponentMessages();

      return () =>
        h(
          "span",
          {
            ...ctx.attrs,
            role: "status",
            "aria-label":
              (ctx.attrs["aria-label"] as string | undefined) ?? messages.value.ai.loading,
            "data-scope": "ai",
            "data-part": "loader",
          },
          ctx.slots.default?.(),
        );
    },
  }),
);

/** The whole family under one handle — `Ai.Conversation`,
 * `Ai.Message`, and the rest, exactly as before the split. */
export const Ai = defineFamily(AiConversation, {
  Root: AiConversation,
  Conversation: AiConversation,
  MessageContent: AiContent,
  Actions: AiActions,
  Loader: AiLoader,
  Message,
  Response,
  Reasoning,
  Tool,
  Sources,
  Source,
  Action,
  Suggestion,
  PromptInput,
});
