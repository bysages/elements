import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes } from "react";

import { Action } from "../ai-action";
import { Message } from "../ai-message";
import { PromptInput } from "../ai-prompt-input";
import { Reasoning } from "../ai-reasoning";
import { Response } from "../ai-response";
import { Source, Sources } from "../ai-source";
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
 * screen readers. */
const Conversation = part("Conversation", "div", { role: "log", "aria-label": "Conversation" });

/** The bubble's inner measure — content that belongs to neither side
 * specifically. */
const MessageContent = part("Content", "div");

/** The quiet row under a message — copy, retry, feedback. */
const Actions = part("Actions", "div");

/** The while-it-works whisper for the in-flight turns. */
const Loader = part("Loader", "span", { role: "status", "aria-label": "Loading" });

/** The whole family under one handle — `Ai.Conversation`,
 * `Ai.Message`, and the rest, exactly as before the split. */
export const Ai = Object.assign(Conversation, {
  Conversation,
  MessageContent,
  Actions,
  Loader,
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
