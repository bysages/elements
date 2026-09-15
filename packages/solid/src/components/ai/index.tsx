import { injectComponentStyle } from "@bysages/core";
import { renderHtml } from "@tanstack/markdown/html";
import type { JSX } from "solid-js";
import { createMemo, splitProps } from "solid-js";

import type { DataUIPart, FileUIPart, ReasoningUIPart, SourceDocumentUIPart, SourceUrlUIPart, StepStartUIPart, TextUIPart, ToolUIPart, UIMessage, UIMessagePart } from "ai";
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
  function Component(props: JSX.HTMLAttributes<HTMLElement>) {
    return <div {...extra} {...props} data-scope="ai" data-part={name.toLowerCase()} />;
  }
  return Component;
}

const Conversation = part("Conversation", "div", { role: "log", "aria-label": "Conversation" });
const Content = part("Content", "div");
const Sources = part("Sources", "ol");
const Actions = part("Actions", "div");
const Loader = part("Loader", "span", { role: "status", "aria-label": "Loading" });

/** The folding chevron the shared indicator turns. */
const chevron = (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M6 4l4 4-4 4"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
);

export type MessageRole = "user" | "assistant" | "system";

export interface MessageProps extends JSX.HTMLAttributes<HTMLElement> {
  role?: MessageRole;
}

/** Whose stroke this is — the user's words sit in a recessed bubble,
 * the assistant speaks flat on the paper. */
export function Message(props: MessageProps) {
  const [own, rest] = splitProps(props, ["role"]);
  return (
    <article {...rest} data-scope="ai" data-part="message" data-role={own.role ?? "assistant"} />
  );
}

export interface ResponseProps extends JSX.HTMLAttributes<HTMLDivElement> {
  content: string;
}

/** Markdown set on the paper. Rendering goes through
 * `@tanstack/markdown`, whose defaults leave raw HTML and executable
 * links inert — streaming-safe by construction. */
export function Response(props: ResponseProps) {
  const [own, rest] = splitProps(props, ["content"]);
  const html = createMemo(() => renderHtml(own.content));
  return (
    <div {...rest} data-scope="ai" data-part="response" innerHTML={html()} />
  );
}

export interface ReasoningProps extends JSX.HTMLAttributes<HTMLDivElement> {
  label?: string;
}

/** The model's thought, folded by the shared collapsible in its quiet
 * register: bare ink for a trigger, the thought on one hairline. */
export function Reasoning(props: ReasoningProps) {
  const [own, rest] = splitProps(props, ["label", "children"]);
  return (
    <Collapsible.Root {...rest} data-ai="reasoning">
      <Collapsible.Trigger>
        <span>{own.label ?? "Thinking"}</span>
        <Collapsible.Indicator>{chevron}</Collapsible.Indicator>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div data-scope="ai" data-part="reasoning-content">
          {own.children}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export type ToolStatus = "pending" | "running" | "completed" | "error";

export interface ToolProps extends JSX.HTMLAttributes<HTMLDivElement> {
  name: string;
  status?: ToolStatus;
  input?: string;
  output?: string;
}

/** A tool call: the shared collapsible as the vessel — the name it was
 * reached by and the state it reached in on the trigger, its input and
 * output folded inside. */
export function Tool(props: ToolProps) {
  const [own, rest] = splitProps(props, ["name", "status", "input", "output"]);
  return (
    <Collapsible.Root
      {...rest}
      data-ai="tool"
      {...(own.status ? { "data-status": own.status } : {})}
    >
      <Collapsible.Trigger>
        <span>{own.name}</span>
        {own.status ? (
          <span data-scope="ai" data-part="tool-status">
            {own.status.charAt(0).toUpperCase() + own.status.slice(1)}
          </span>
        ) : null}
        <Collapsible.Indicator>{chevron}</Collapsible.Indicator>
      </Collapsible.Trigger>
      <Collapsible.Content>
        <div data-scope="ai" data-part="tool-body">
          {own.input !== undefined ? (
            <>
              <span data-scope="ai" data-part="tool-label">
                Input
              </span>
              <pre>{own.input}</pre>
            </>
          ) : null}
          {own.output !== undefined ? (
            <>
              <span data-scope="ai" data-part="tool-label">
                Output
              </span>
              <pre>{own.output}</pre>
            </>
          ) : null}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  );
}

export interface SourceProps extends JSX.HTMLAttributes<HTMLAnchorElement> {
  href: string;
}

/** One place the ink came from; href and the rest ride the anchor. */
export function Source(props: SourceProps) {
  const [own, rest] = splitProps(props, ["href", "children"]);
  return (
    <li data-scope="ai" data-part="source">
      <a {...rest} href={own.href} target="_blank" rel="noreferrer">
        {own.children ?? own.href}
      </a>
    </li>
  );
}

export interface ActionProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  label: string;
}

/** A quiet icon button — copy, retry, thumbs. The label names it to
 * assistive tech and as the hover title. The control itself is the
 * shared Button in its ghost register. */
export function Action(props: ActionProps) {
  const [own, rest] = splitProps(props, ["label", "children"]);
  return (
    <Button variant="ghost" size="sm" square aria-label={own.label} title={own.label} {...rest}>
      {own.children}
    </Button>
  );
}

export interface SuggestionProps extends JSX.HTMLAttributes<HTMLButtonElement> {
  prompt: string;
  onSelect?: (prompt: string) => void;
}

/** A seal-cut button proposing the next stroke; selection hands back
 * the prompt. The shared Button in its outline register. */
export function Suggestion(props: SuggestionProps) {
  const [own, rest] = splitProps(props, ["prompt", "onSelect"]);
  return (
    <Button
      variant="outline"
      size="sm"
      {...rest}
      onClick={() => own.onSelect?.(own.prompt)}
    >
      {own.prompt}
    </Button>
  );
}

export interface PromptInputProps extends JSX.HTMLAttributes<HTMLFormElement> {
  value: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

/** The prompt vessel: the shared field textarea — self-growing on the
 * machine's autoresize — over a footer row carrying the submit seal.
 * Controlled — bind `value` and take the text on `onSubmit`. Enter
 * sends; Shift+Enter breaks the line. */
export function PromptInput(props: PromptInputProps) {
  const [own, rest] = splitProps(props, [
    "value",
    "onValueChange",
    "onSubmit",
    "placeholder",
    "disabled",
  ]);
  const send = () => {
    const text = own.value.trim();
    if (!text || own.disabled) return;
    own.onSubmit?.(text);
    own.onValueChange?.("");
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
          value={own.value}
          placeholder={own.placeholder ?? "Send a message"}
          disabled={own.disabled}
          onValueChange={(details) => own.onValueChange?.(details.value)}
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
          disabled={own.disabled || !own.value.trim()}
        >
          <svg
            viewBox="0 0 16 16"
            width={14}
            height={14}
            aria-hidden="true"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            stroke-linecap="square"
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
  Content,
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
