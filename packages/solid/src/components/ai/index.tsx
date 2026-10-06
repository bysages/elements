import { injectComponentStyle, type ComponentMessages } from "@bysages/core";
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
 * screen readers. */
export const AiConversation = part("Conversation", (messages) => ({
  role: "log",
  "aria-label": messages.ai.conversation,
}));

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

injectComponentStyle("ai");
