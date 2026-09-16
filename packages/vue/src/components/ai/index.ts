import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

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

/** The log itself: the column every stroke lands in, a landmark to
 * screen readers. */
export const AiConversation = part("Conversation", "div", {
  role: "log",
  "aria-label": "Conversation",
});

/** The bubble's inner measure — content that belongs to neither side
 * specifically. */
export const AiContent = part("Content", "div");

/** The quiet row under a message — copy, retry, feedback. */
export const AiActions = part("Actions", "div");

/** The while-it-works whisper for the in-flight turns. */
export const AiLoader = part("Loader", "span", { role: "status", "aria-label": "Loading" });

/** The whole family under one handle — `Ai.Conversation`,
 * `Ai.Message`, and the rest, exactly as before the split. */
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
