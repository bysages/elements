import { withSelfRoot } from "../../internal/family";
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
import AiMediaSvelte from "./AiMedia.svelte";
import AiPartsSvelte from "./AiParts.svelte";
import { toolPartDisplay, type AiMediaComponent, type AiPartsComponent } from "./parts";

export type {
  ActionProps,
  AiConversationProps,
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
export type {
  AiMediaComponent,
  AiMediaKind,
  AiMediaProps,
  AiPartsComponent,
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

export const AiMedia = withSelfRoot(AiMediaSvelte as unknown as AiMediaComponent);
export const AiParts = AiPartsSvelte as unknown as AiPartsComponent;
export { toolPartDisplay };

/** A conversation column: Root is the log, Message carries a role, and
 * the speaking parts — Response, Reasoning, Tool, Sources — part the
 * stream. The interactive folds are the shared Collapsible wearing a
 * `data-ai` marker, the prompt vessel the shared Field, so the machine
 * work is never ours. Parts stay agnostic of any client; consumers map
 * their message format (e.g. the `UIMessage` parts re-exported below)
 * onto these primitives. */
export { AiConversation, AiContent, AiActions, AiLoader };

export const Ai = Object.assign(AiConversation, {
  Root: AiConversation,
  Conversation: AiConversation,
  MessageContent: AiContent,
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
  Media: AiMedia,
  Parts: AiParts,
});
