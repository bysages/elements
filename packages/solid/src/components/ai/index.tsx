import type { ComponentMessages } from "@bysages/core";
import { createConversationFollower } from "@bysages/core";
import { injectComponentStyle } from "@bysages/core/styling";
import { createEffect, createSignal, on, onCleanup, onMount, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { withSelfRoot } from "../../internal/family";
import { Action } from "../ai-action";
import { Message } from "../ai-message";
import { PromptInput } from "../ai-prompt-input";
import { Reasoning } from "../ai-reasoning";
import { Response } from "../ai-response";
import { AiSource as Source, AiSources as Sources } from "../ai-source";
import { Suggestion } from "../ai-suggestion";
import { Tool } from "../ai-tool";
import { useComponentMessages } from "../config-provider/use-component-messages";
import { AiMedia, AiParts } from "./parts";

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

/** A conversation column: Root is the log, Message carries a role, and
 * the speaking parts — Response, Reasoning, Tool, Sources — part the
 * stream. The interactive folds are the shared Collapsible wearing a
 * `data-ai` marker, so the machine work is never ours. Parts stay
 * agnostic of any client; consumers map their message format (e.g. the
 * `UIMessage` parts re-exported here) onto these primitives. */
type PartExtra =
  | Partial<JSX.HTMLAttributes<HTMLDivElement>>
  | ((messages: ComponentMessages) => Partial<JSX.HTMLAttributes<HTMLDivElement>>);

function part(name: string, extra: PartExtra = {}) {
  function Component(props: JSX.HTMLAttributes<HTMLDivElement>) {
    const messages = useComponentMessages();
    const partExtra = typeof extra === "function" ? extra(messages()) : extra;
    return <div {...partExtra} {...props} data-scope="ai" data-part={name.toLowerCase()} />;
  }
  return Component;
}

/** The log itself: the column every stroke lands in, a landmark to
 * screen readers. While the reply streams, the log follows its growth —
 * but only while the reader rests at the bottom edge. */
export const AiConversation = function AiConversation(
  props: JSX.HTMLAttributes<HTMLDivElement> & { autoScroll?: boolean },
) {
  const [own, rest] = splitProps(props, ["autoScroll"]);
  const messages = useComponentMessages();
  let node: HTMLDivElement | undefined;
  let stopFollowing: (() => void) | undefined;

  createEffect(
    on(
      () => own.autoScroll !== false,
      (enabled) => {
        stopFollowing?.();
        stopFollowing = undefined;
        if (node && enabled) stopFollowing = createConversationFollower(node);
      },
    ),
  );
  onCleanup(() => stopFollowing?.());

  return (
    <div
      ref={(element) => {
        node = element;
      }}
      {...rest}
      role="log"
      aria-label={props["aria-label"] ?? messages().ai.conversation}
      data-scope="ai"
      data-part="conversation"
    />
  );
};

/** The optional jump-to-latest door: an explicit part the caller drops
 * inside the conversation when the log scrolls. It watches the log's
 * distance from the bottom edge and surfaces only while the reader is
 * away — clicking returns to the stream. Nothing renders by default. */
export interface AiJumpToLatestProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  /** Bottom-edge distance beyond which the door surfaces. */
  threshold?: number;
  onJump?: () => void;
}

export const AiJumpToLatest = function AiJumpToLatest(props: AiJumpToLatestProps) {
  const [own, rest] = splitProps(props, ["threshold", "onJump"]);
  const messages = useComponentMessages();
  const [visible, setVisible] = createSignal(false);
  let button: HTMLButtonElement | undefined;
  let log: HTMLElement | null | undefined;

  const measure = () => {
    if (!log) return;
    setVisible(log.scrollHeight - log.scrollTop - log.clientHeight > (own.threshold ?? 96));
  };

  onMount(() => {
    log = button?.closest<HTMLElement>('[data-scope="ai"][data-part="conversation"]') ?? null;
    log?.addEventListener("scroll", measure, { passive: true });
    measure();
    onCleanup(() => log?.removeEventListener("scroll", measure));
  });

  createEffect(on(() => own.threshold, measure));

  const jump = () => {
    if (log) log.scrollTop = log.scrollHeight;
    own.onJump?.();
  };

  return (
    <button
      ref={(element) => {
        button = element;
      }}
      {...rest}
      type="button"
      data-scope="ai"
      data-part="jump-to-latest"
      data-visible={visible() ? "" : undefined}
      tabIndex={visible() ? 0 : -1}
      aria-label={rest["aria-label"] ?? messages().ai.jumpToLatest}
      onClick={jump}
    >
      {rest.children ?? messages().ai.jumpToLatest}
    </button>
  );
};

/** The bubble's inner measure — content that belongs to neither side
 * specifically. */
export const AiContent = withSelfRoot(part("Content"));

/** The quiet row under a message — copy, retry, feedback. */
export const AiActions = withSelfRoot(part("Actions"));

/** The while-it-works whisper for the in-flight turns. */
export const AiLoader = withSelfRoot(
  part("Loader", (messages) => ({
    role: "status",
    "aria-label": messages.ai.loading,
  })),
);

/** The whole family under one handle — `Ai.Conversation`,
 * `Ai.MessageContent`, and the rest. */
export const Ai = Object.assign(AiConversation, {
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

injectComponentStyle("ai");
