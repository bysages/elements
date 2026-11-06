import { createConversationFollower } from "@bysages/core";
import { injectComponentStyle } from "@bysages/core/styling";
import type { SetupContext } from "vue";
import { defineComponent, h, onMounted, onScopeDispose, ref, watch } from "vue";

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
import { AiMedia, AiParts } from "./parts";

/** A conversation column: Root is the log, Message carries a role, and
 * the speaking parts — Response, Reasoning, Tool, Sources — part the
 * stream. The interactive folds are the shared Collapsible wearing a
 * `data-ai` marker, so the machine work is never ours. Parts stay
 * agnostic of any client; consumers map their message format (e.g. the
 * `UIMessage` parts re-exported here) onto these primitives. */
export type {
  ChatOnDataCallback,
  ChatOnErrorCallback,
  ChatOnFinishCallback,
  ChatState,
  ChatStatus,
  CreateUIMessage,
  CustomContentUIPart,
  DataUIPart,
  DynamicToolUIPart,
  FileUIPart,
  InferUITools,
  ProviderMetadata,
  ProviderReference,
  ReasoningFileUIPart,
  ReasoningUIPart,
  SourceDocumentUIPart,
  SourceUrlUIPart,
  StepStartUIPart,
  TextUIPart,
  ToolSet,
  ToolUIPart,
  UIDataTypes,
  UIMessage,
  UIMessageChunk,
  UIMessagePart,
  UITool,
  UIToolInvocation,
  UITools,
} from "ai";
export type {
  AiMediaKind,
  AiMediaProps,
  AiPartsProps,
  AiPartsSlots,
  AiSdkCustomPart,
  AiSdkDataPart,
  AiSdkFilePart,
  AiSdkMessage,
  AiSdkMediaPart,
  AiSdkMessagePart,
  AiSdkReasoningFilePart,
  AiSdkReasoningPart,
  AiSdkSourceDocumentPart,
  AiSdkSourceUrlPart,
  AiSdkStepStartPart,
  AiSdkTextPart,
  AiSdkToolPart,
  AiToolDisplay,
} from "./parts";
export type { MessageProps } from "../ai-message";
export { toolPartDisplay } from "./parts";
export { AiMedia, AiParts };

function part(name: string, tag: string, extra: Record<string, unknown> = {}, fallback?: string) {
  return defineComponent({
    name: "Ai" + name,
    inheritAttrs: false,
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
/** The node a transcript is actually scrolled through: prefer the log,
 * then walk outward once a caller owns the scroll in a taller lane. */
function scrollOwner(node: HTMLElement): HTMLElement {
  const scrolls = (element: HTMLElement) => {
    const overflow = getComputedStyle(element).overflowY;
    return overflow === "auto" || overflow === "scroll";
  };
  if (scrolls(node)) return node;
  let outer = node.parentElement;
  while (outer && !scrolls(outer)) outer = outer.parentElement;
  return outer ?? node;
}
export const AiConversation = defineComponent({
  name: "AiConversation",
  inheritAttrs: false,
  props: {
    /** Follow the stream's growth while the reader rests at the bottom. */
    autoScroll: { type: Boolean, default: true },
  },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("ai");
    const messages = useComponentMessages();
    const { "aria-label": consumerLabel, ...rootAttrs } = ctx.attrs;

    const el = ref<HTMLElement | null>(null);
    let stopFollowing: (() => void) | undefined;

    onMounted(() => {
      if (!el.value || !props.autoScroll) return;
      stopFollowing = createConversationFollower(scrollOwner(el.value));
    });
    watch(
      () => props.autoScroll,
      (enabled) => {
        stopFollowing?.();
        stopFollowing = undefined;
        if (enabled && el.value) stopFollowing = createConversationFollower(el.value);
      },
    );
    onScopeDispose(() => stopFollowing?.());

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

/** The optional jump-to-latest door: an explicit part the caller drops
 * inside the conversation when the log scrolls. It watches the log's
 * distance from the bottom edge and surfaces only while the reader is
 * away — clicking returns to the stream. Nothing renders by default. */
export const AiJumpToLatest = defineComponent({
  name: "AiJumpToLatest",
  inheritAttrs: false,
  props: {
    /** Bottom-edge distance beyond which the door surfaces. */
    threshold: { type: Number, default: 96 },
  },
  emits: { jump: () => true },
  setup(props, ctx: SetupContext) {
    injectComponentStyle("ai");
    const messages = useComponentMessages();
    const el = ref<HTMLElement | null>(null);
    const visible = ref(false);
    let log: HTMLElement | null | undefined;

    const measure = () => {
      if (!log || !el.value) return;
      visible.value = log.scrollHeight - log.scrollTop - log.clientHeight > props.threshold;
    };
    const jump = () => {
      if (log) log.scrollTop = log.scrollHeight;
      ctx.emit("jump");
    };

    onMounted(() => {
      const node = el.value?.closest<HTMLElement>('[data-scope="ai"][data-part="conversation"]');
      log = node ? scrollOwner(node) : undefined;
      log?.addEventListener("scroll", measure, { passive: true });
      measure();
    });
    onScopeDispose(() => log?.removeEventListener("scroll", measure));

    return () =>
      h(
        "button",
        {
          ref: el,
          type: "button",
          ...ctx.attrs,
          "data-scope": "ai",
          "data-part": "jump-to-latest",
          "data-visible": visible.value ? "" : undefined,
          tabindex: visible.value ? 0 : -1,
          "aria-label": messages.value.ai.jumpToLatest,
          onClick: jump,
        },
        ctx.slots.default?.() ?? messages.value.ai.jumpToLatest,
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
    inheritAttrs: false,
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
  Media: AiMedia,
  Parts: AiParts,
  JumpToLatest: AiJumpToLatest,
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
