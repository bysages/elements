import type { Snippet } from "svelte";
import type { HTMLAttributes, HTMLButtonAttributes } from "svelte/elements";

export interface AiPartProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}

export interface AiConversationProps extends AiPartProps {
  /** Follow the stream's growth while the reader rests at the bottom. */
  autoScroll?: boolean;
}

export interface AiJumpToLatestProps extends HTMLButtonAttributes {
  /** Bottom-edge distance beyond which the door surfaces. */
  threshold?: number;
  /** The reader returned to the live edge. */
  onjump?: () => void;
}

export type { ActionProps } from "../ai-action/props";
export type { MessageProps, MessageRole } from "../ai-message/props";
export type { PromptInputProps } from "../ai-prompt-input/props";
export type { ReasoningProps } from "../ai-reasoning/props";
export type { ResponseProps } from "../ai-response/props";
export type { SourceProps, SourcesProps } from "../ai-source/props";
export type { SuggestionProps } from "../ai-suggestion/props";
export type { ToolProps, ToolStatus } from "../ai-tool/props";
