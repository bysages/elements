import { injectComponentStyle } from "@bysages/core";
import { renderHtml } from "@tanstack/markdown/html";
import type { HTMLAttributes, ReactNode } from "react";

import { Button } from "../button";
import { Collapsible } from "../collapsible";
import { Field } from "../field";

/** A conversation column: Root is the log, Message carries a role, and
 * the speaking parts — Response, Reasoning, Tool, Sources — part the
 * stream. The interactive folds are the shared Collapsible wearing a
 * `data-ai` marker, so the machine work is never ours. Parts stay
 * agnostic of any client; consumers map their message format (e.g. the
 * `UIMessage` parts re-exported below) onto these primitives. */
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

const Conversation = part("Conversation", "div", { role: "log", "aria-label": "Conversation" });
const MessageContent = part("Content", "div");
const Sources = part("Sources", "ol");
const Actions = part("Actions", "div");
const Loader = part("Loader", "span", { role: "status", "aria-label": "Loading" });

/** The folding chevron the shared indicator turns. */
const chevron = (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M6 4l4 4-4 4"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export type ToolStatus = "pending" | "running" | "completed" | "error";

/** Whose stroke this is — the user's words sit in a recessed bubble,
 * the assistant speaks flat on the paper. */
export interface MessageProps extends HTMLAttributes<HTMLElement> {
  role?: "user" | "assistant" | "system";
  children?: ReactNode;
}

export function Message({ role = "assistant", children, ...rest }: MessageProps) {
  return (
    <article {...rest} data-scope="ai" data-part="message" data-role={role}>
      {children}
    </article>
  );
}

/** Markdown set on the paper. Rendering goes through
 * `@tanstack/markdown`, whose defaults leave raw HTML and executable
 * links inert — streaming-safe by construction. */
export interface ResponseProps extends HTMLAttributes<HTMLDivElement> {
  content: string;
}

export function Response({ content, ...rest }: ResponseProps) {
  return (
    <div
      {...rest}
      data-scope="ai"
      data-part="response"
      dangerouslySetInnerHTML={{ __html: renderHtml(content) }}
    />
  );
}

/** The model's thought, folded by the shared collapsible in its quiet
 * register: bare ink for a trigger, the thought on one hairline. */
export interface ReasoningProps extends HTMLAttributes<HTMLDivElement> {
  label?: string;
  defaultOpen?: boolean;
  children?: ReactNode;
}

export function Reasoning({ label = "Thinking", children, ...rest }: ReasoningProps) {
  return (
    <Collapsible.Root {...rest} data-ai="reasoning">
      <Collapsible.Trigger>
        <span>{label}</span>
        <Collapsible.Indicator>{chevron}</Collapsible.Indicator>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div data-scope="ai" data-part="reasoning-content">
          {children}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

/** A tool call: the shared collapsible as the vessel — the name it was
 * reached by and the state it reached in on the trigger, its input and
 * output folded inside. */
export interface ToolProps extends HTMLAttributes<HTMLDivElement> {
  name: string;
  status?: ToolStatus;
  defaultOpen?: boolean;
  input?: ReactNode;
  output?: ReactNode;
}

export function Tool({ name, status, input, output, ...rest }: ToolProps) {
  return (
    <Collapsible.Root {...rest} data-ai="tool" data-status={status}>
      <Collapsible.Trigger>
        <span>{name}</span>
        {status ? (
          <span data-scope="ai" data-part="tool-status">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        ) : null}
        <Collapsible.Indicator>{chevron}</Collapsible.Indicator>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div data-scope="ai" data-part="tool-body">
          {input ? (
            <>
              <span data-scope="ai" data-part="tool-label">
                Input
              </span>
              <pre>{input}</pre>
            </>
          ) : null}
          {output ? (
            <>
              <span data-scope="ai" data-part="tool-label">
                Output
              </span>
              <pre>{output}</pre>
            </>
          ) : null}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

/** One place the ink came from; href and the rest ride the anchor. */
export interface SourceProps extends HTMLAttributes<HTMLAnchorElement> {
  href: string;
  children?: ReactNode;
}

export function Source({ href, children, ...rest }: SourceProps) {
  return (
    <li data-scope="ai" data-part="source">
      <a {...rest} href={href} target="_blank" rel="noreferrer">
        {children ?? href}
      </a>
    </li>
  );
}

/** A quiet icon button — copy, retry, thumbs. The label names it to
 * assistive tech and as the hover title. The control itself is the
 * shared Button in its ghost register. */
export interface ActionProps extends HTMLAttributes<HTMLButtonElement> {
  label: string;
  children?: ReactNode;
}

export function Action({ label, children, ...rest }: ActionProps) {
  return (
    <Button variant="ghost" size="sm" square aria-label={label} title={label} {...rest}>
      {children}
    </Button>
  );
}

/** A seal-cut button proposing the next stroke; selection hands back
 * the prompt. The shared Button in its outline register. */
export interface SuggestionProps extends Omit<HTMLAttributes<HTMLButtonElement>, "onSelect"> {
  prompt: string;
  onSelect?: (prompt: string) => void;
}

export function Suggestion({ prompt, onSelect, ...rest }: SuggestionProps) {
  return (
    <Button variant="outline" size="sm" {...rest} onClick={() => onSelect?.(prompt)}>
      {prompt}
    </Button>
  );
}

/** The prompt vessel: the shared field textarea — self-growing on the
 * machine's autoresize — over a footer row carrying the submit seal.
 * Controlled — bind `value` and take the text on `submit`. Enter
 * sends; Shift+Enter breaks the line. */
export interface PromptInputProps extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  value: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

export function PromptInput({
  value,
  onValueChange,
  onSubmit,
  placeholder = "Send a message",
  disabled = false,
  ...rest
}: PromptInputProps) {
  const send = () => {
    const text = value.trim();
    if (!text || disabled) return;
    onSubmit?.(text);
    onValueChange?.("");
  };

  return (
    <form
      {...rest}
      data-scope="ai"
      data-part="prompt"
      onSubmit={(event) => {
        event.preventDefault();
        send();
      }}
    >
      <Field.Root>
        <Field.Textarea
          autoresize
          rows={1}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onChange={(event) => onValueChange?.(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              send();
            }
          }}
        />
      </Field.Root>
      <div data-scope="ai" data-part="prompt-footer">
        <Button
          variant="solid"
          size="sm"
          square
          type="submit"
          aria-label="Send"
          disabled={disabled || !value.trim()}
        >
          <svg
            viewBox="0 0 16 16"
            width={14}
            height={14}
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            strokeLinecap="square"
          >
            <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
          </svg>
        </Button>
      </div>
    </form>
  );
}

export const Ai = Object.assign(Conversation, {
  Conversation,
  Message,
  MessageContent,
  Response,
  Reasoning,
  Tool,
  Sources,
  Source,
  Actions,
  Action,
  Suggestion,
  PromptInput,
  Loader,
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
