import { injectComponentStyle } from "@bysages/core";

import { AiAction as Action } from "../ai-action";
import { AiMessage as Message } from "../ai-message";
import { AiPromptInput as PromptInput } from "../ai-prompt-input";
import { AiReasoning as Reasoning } from "../ai-reasoning";
import { AiResponse as Response } from "../ai-response";
import { AiSource as Source, AiSources as Sources } from "../ai-source";
import { AiSuggestion as Suggestion } from "../ai-suggestion";
import { AiTool as Tool } from "../ai-tool";
import AiConversation from "./Ai.svelte";
import AiActions from "./AiActions.svelte";
import AiContent from "./AiContent.svelte";
import AiLoader from "./AiLoader.svelte";

export type {
  ActionProps,
  AiPartProps,
  MessageProps,
  MessageRole,
  PromptInputProps,
  ReasoningProps,
  ResponseProps,
  SourceProps,
  SuggestionProps,
  ToolProps,
  ToolStatus,
} from "./props";

/** A conversation column: Root is the log, Message carries a role, and
 * the speaking parts — Response, Reasoning, Tool, Sources — part the
 * stream. The interactive folds are the shared Collapsible wearing a
 * `data-ai` marker, the prompt vessel the shared Field, so the machine
 * work is never ours. Parts stay agnostic of any client; consumers map
 * their message format (e.g. the `UIMessage` parts re-exported below)
 * onto these primitives. */
export const Ai = Object.assign(AiConversation, {
  Conversation: AiConversation,
  Content: AiContent,
  Message,
  Response,
  Reasoning,
  Tool,
  Sources,
  Source,
  Actions: AiActions,
  Action,
  Suggestion,
  PromptInput,
  Loader: AiLoader,
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
