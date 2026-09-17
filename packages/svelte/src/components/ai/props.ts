import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface AiPartProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}

export type { ActionProps } from "../ai-action/props";
export type { MessageProps, MessageRole } from "../ai-message/props";
export type { PromptInputProps } from "../ai-prompt-input/props";
export type { ReasoningProps } from "../ai-reasoning/props";
export type { ResponseProps } from "../ai-response/props";
export type { SourceProps, SourcesProps } from "../ai-source/props";
export type { SuggestionProps } from "../ai-suggestion/props";
export type { ToolProps, ToolStatus } from "../ai-tool/props";
