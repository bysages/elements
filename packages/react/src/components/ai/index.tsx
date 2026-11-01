import { createConversationFollower } from "@bysages/core";
import { injectComponentStyle } from "@bysages/core/styling";
import { useCallback, useEffect, useRef, useState, type HTMLAttributes } from "react";

import { withSelfRoot } from "../../internal/family";
import { useComponentMessages } from "../../internal/messages";
import { Action } from "../ai-action";
import { Message } from "../ai-message";
import { PromptInput } from "../ai-prompt-input";
import { Reasoning } from "../ai-reasoning";
import { Response } from "../ai-response";
import { Source, Sources } from "../ai-source";
import { Suggestion } from "../ai-suggestion";
import { Tool } from "../ai-tool";
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
function part(name: string, tag: string, extra: Record<string, string> = {}) {
  const Tag = tag as "div";
  const Component = ({ children, ...rest }: HTMLAttributes<HTMLElement>) => (
    <Tag {...extra} {...rest} data-scope="ai" data-part={name.toLowerCase()}>
      {children}
    </Tag>
  );
  Component.displayName = "Ai" + name;
  return Component;
}

/** The log itself: the column every stroke lands in, a landmark to
 * screen readers. While the reply streams, the log follows its growth —
 * but only while the reader rests at the bottom edge. */
export function AiConversation({
  autoScroll = true,
  children,
  ...rest
}: HTMLAttributes<HTMLElement> & { autoScroll?: boolean }) {
  const messages = useComponentMessages();
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node || !autoScroll) return;
    return createConversationFollower(node);
  }, [autoScroll]);

  return (
    <div
      ref={ref}
      {...rest}
      role="log"
      aria-label={rest["aria-label"] ?? messages.ai.conversation}
      data-scope="ai"
      data-part="conversation"
    >
      {children}
    </div>
  );
}

/** The optional jump-to-latest door: an explicit part the caller drops
 * inside the conversation when the log scrolls. It watches the log's
 * distance from the bottom edge and surfaces only while the reader is
 * away — clicking returns to the stream. Nothing renders by default. */
export function AiJumpToLatest({
  threshold = 96,
  onJump,
  children,
  ...rest
}: HTMLAttributes<HTMLButtonElement> & { threshold?: number; onJump?: () => void }) {
  const messages = useComponentMessages();
  const ref = useRef<HTMLButtonElement | null>(null);
  const [visible, setVisible] = useState(false);

  const measure = useCallback(() => {
    const log = ref.current?.closest<HTMLElement>('[data-scope="ai"][data-part="conversation"]');
    if (!log) return;
    setVisible(log.scrollHeight - log.scrollTop - log.clientHeight > threshold);
  }, [threshold]);

  useEffect(() => {
    const log = ref.current?.closest<HTMLElement>('[data-scope="ai"][data-part="conversation"]');
    if (!log) return;
    log.addEventListener("scroll", measure, { passive: true });
    measure();
    return () => log.removeEventListener("scroll", measure);
  }, [measure]);

  const jump = useCallback(() => {
    const log = ref.current?.closest<HTMLElement>('[data-scope="ai"][data-part="conversation"]');
    if (log) log.scrollTop = log.scrollHeight;
    onJump?.();
  }, [onJump]);

  return (
    <button
      ref={ref}
      {...rest}
      type="button"
      data-scope="ai"
      data-part="jump-to-latest"
      data-visible={visible ? "" : undefined}
      tabIndex={visible ? 0 : -1}
      aria-label={rest["aria-label"] ?? messages.ai.jumpToLatest}
      onClick={jump}
    >
      {children ?? messages.ai.jumpToLatest}
    </button>
  );
}

/** The bubble's inner measure — content that belongs to neither side
 * specifically. */
export const AiContent = withSelfRoot(part("Content", "div"));

/** The quiet row under a message — copy, retry, feedback. */
export const AiActions = withSelfRoot(part("Actions", "div"));

/** The while-it-works whisper for the in-flight turns. */
function AiLoader({ children, ...rest }: HTMLAttributes<HTMLElement>) {
  const messages = useComponentMessages();

  return (
    <span
      {...rest}
      role="status"
      aria-label={rest["aria-label"] ?? messages.ai.loading}
      data-scope="ai"
      data-part="loader"
    >
      {children}
    </span>
  );
}

/** The whole family under one handle — `Ai.Conversation`,
 * `Ai.Message`, and the rest, exactly as before the split. */
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
