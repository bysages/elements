import { injectComponentStyle } from "@bysages/core";
import type { JSX } from "solid-js";

import { Action } from "../ai-action";
import { Message } from "../ai-message";
import { PromptInput } from "../ai-prompt-input";
import { Reasoning } from "../ai-reasoning";
import { Response } from "../ai-response";
import { AiSource as Source, AiSources as Sources } from "../ai-source";
import { Suggestion } from "../ai-suggestion";
import { Tool } from "../ai-tool";

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
function part(name: string, extra: Partial<JSX.HTMLAttributes<HTMLDivElement>> = {}) {
  function Component(props: JSX.HTMLAttributes<HTMLDivElement>) {
    return <div {...extra} {...props} data-scope="ai" data-part={name.toLowerCase()} />;
  }
  return Component;
}

/** The log itself: the column every stroke lands in, a landmark to
 * screen readers. */
export const AiConversation = part("Conversation", { role: "log", "aria-label": "Conversation" });

/** The bubble's inner measure — content that belongs to neither side
 * specifically. */
export const AiContent = part("Content");

/** The quiet row under a message — copy, retry, feedback. */
export const AiActions = part("Actions");

/** The while-it-works whisper for the in-flight turns. */
export const AiLoader = part("Loader", { role: "status", "aria-label": "Loading" });

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
