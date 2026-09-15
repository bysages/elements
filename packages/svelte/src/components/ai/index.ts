import { injectComponentStyle } from "@bysages/core";
import AiConversation from "./Ai.svelte";
import AiContent from "./AiContent.svelte";
import AiMessage from "./AiMessage.svelte";
import AiResponse from "./AiResponse.svelte";
import AiReasoning from "./AiReasoning.svelte";
import AiTool from "./AiTool.svelte";
import AiSources from "./AiSources.svelte";
import AiSource from "./AiSource.svelte";
import AiActions from "./AiActions.svelte";
import AiAction from "./AiAction.svelte";
import AiSuggestion from "./AiSuggestion.svelte";
import AiPromptInput from "./AiPromptInput.svelte";
import AiLoader from "./AiLoader.svelte";

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
  Message: AiMessage,
  Response: AiResponse,
  Reasoning: AiReasoning,
  Tool: AiTool,
  Sources: AiSources,
  Source: AiSource,
  Actions: AiActions,
  Action: AiAction,
  Suggestion: AiSuggestion,
  PromptInput: AiPromptInput,
  Loader: AiLoader,
});

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
