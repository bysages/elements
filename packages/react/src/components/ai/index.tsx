import { injectComponentStyle } from "@bysages/core";
import { renderHtml } from "@tanstack/markdown/html";
import type { HTMLAttributes, ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";

import { Button } from "../button";

/** A conversation column: Root is the log, Message carries a role, and
 * the speaking parts — Response, Reasoning, Tool, Sources — part the
 * stream. Parts stay agnostic of any client; consumers map their
 * message format (e.g. the `UIMessage` parts re-exported below) onto
 * these primitives. */
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

/** The model's thought: a native disclosure, so folding costs no
 * script. Pass `open` to start unfolded. */
export interface ReasoningProps extends HTMLAttributes<HTMLDetailsElement> {
  label?: string;
  open?: boolean;
  children?: ReactNode;
}

export function Reasoning({ label = "Thinking", children, ...rest }: ReasoningProps) {
  return (
    <details {...rest} data-scope="ai" data-part="reasoning">
      <summary>{label}</summary>
      {children ? (
        <div data-scope="ai" data-part="reasoning-content">
          {children}
        </div>
      ) : null}
    </details>
  );
}

/** A tool call: the name it was reached by, the state it reached in,
 * and — folded inside — its input and output. */
export interface ToolProps extends HTMLAttributes<HTMLDetailsElement> {
  name: string;
  status?: ToolStatus;
  open?: boolean;
  input?: ReactNode;
  output?: ReactNode;
}

export function Tool({ name, status, input, output, ...rest }: ToolProps) {
  return (
    <details {...rest} data-scope="ai" data-part="tool" data-status={status}>
      <summary>
        <span>{name}</span>
        {status ? (
          <span data-scope="ai" data-part="tool-status">
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        ) : null}
      </summary>
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
    </details>
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
    <Button variant="ghost" size="sm" aria-label={label} title={label} {...rest}>
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

/** The prompt vessel: a bare, self-growing textarea and the submit
 * seal. Controlled — bind `value` and take the text on `submit`.
 * Enter sends; Shift+Enter breaks the line. */
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
  const field = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    const el = field.current;
    if (!el) return;
    el.style.blockSize = "auto";
    el.style.blockSize = `${el.scrollHeight}px`;
  }, [value]);

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
      <textarea
        ref={field}
        data-scope="ai"
        data-part="prompt-textarea"
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
      <Button
        variant="solid"
        size="sm"
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
