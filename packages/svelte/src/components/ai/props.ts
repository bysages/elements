import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export type MessageRole = "user" | "assistant" | "system";
export type ToolStatus = "pending" | "running" | "completed" | "error";

export interface AiPartProps extends HTMLAttributes<HTMLElement> {
  children?: Snippet;
}

export interface MessageProps extends HTMLAttributes<HTMLElement> {
  role?: MessageRole;
  children?: Snippet;
}

export interface ResponseProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
}

export interface ReasoningProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  children?: Snippet;
}

export interface ToolProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  status?: ToolStatus;
  input?: string;
  output?: string;
}

export interface SourceProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  children?: Snippet;
}

export interface ActionProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  children?: Snippet;
}

export interface SuggestionProps extends HTMLAttributes<HTMLButtonElement> {
  prompt: string;
  onSelect?: (prompt: string) => void;
}

export interface PromptInputProps extends HTMLAttributes<HTMLFormElement> {
  /** Two-way bindable — `bind:value` keeps the bound variable mirroring
   * the field; send clears it back through the binding. */
  value?: string;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}
