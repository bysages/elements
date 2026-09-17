import { injectComponentStyle } from "@bysages/core";
import { Show, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { Button } from "../button";
import { Field } from "../field";

function arrowUpGlyph() {
  return (
    <svg
      viewBox="0 0 16 16"
      width="14"
      height="14"
      aria-hidden="true"
      fill="none"
      stroke="currentColor"
      stroke-width="1.5"
      stroke-linecap="square"
    >
      <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
    </svg>
  );
}

function stopGlyph() {
  return (
    <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
      <rect x="4.5" y="4.5" width="7" height="7" fill="currentColor" />
    </svg>
  );
}

export interface PromptInputProps extends Omit<
  JSX.HTMLAttributes<HTMLFormElement>,
  "onSubmit" | "value"
> {
  /** The draft in the vessel — bind `value`; it clears itself on
   * a successful submit. */
  value?: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onStop?: () => void;
  /** The quiet invitation before the reader types. */
  placeholder?: string;
  /** Still the words on the canvas, but the submit seal does
   * nothing and Enter stays a line break. */
  disabled?: boolean;
  /** The machine is working — the seal becomes a stop seal and
   * Enter holds its breath. */
  busy?: boolean;
  /** Attachments riding above the text. */
  header?: JSX.Element;
  /** The tools at the text's left. */
  leading?: JSX.Element;
  /** The row at the text's right — the send seal falls there by
   * default. */
  trailing?: JSX.Element;
  /** The tools beneath the text. */
  footer?: JSX.Element;
  /** The controls that close the footer row — the seal falls there
   * when a footer exists. */
  footerEnd?: JSX.Element;
}

/** The prompt vessel: the shared field textarea — self-growing on the
 * machine's autoresize — with the submit seal riding its last line.
 * Around the body, the slot props answer the composer's anatomy:
 * `header` for attachments riding above, `leading` for the tools at
 * the text's left, `trailing` for the seal itself, `footer` for the
 * tools beneath, and `footerEnd` for the controls that close the
 * footer row — the seal falls there by default, so a model picker
 * dropped in rides the send's shoulder. An empty slot renders no part,
 * so the bare vessel stays one quiet line. Controlled — bind `value`
 * and take the text on `onSubmit`. Enter sends; Shift+Enter breaks the
 * line. While `busy` the seal becomes a stop seal and Enter holds its
 * breath. */
export function PromptInput(props: PromptInputProps) {
  const [own, rest] = splitProps(props, [
    "value",
    "onValueChange",
    "onSubmit",
    "onStop",
    "placeholder",
    "disabled",
    "busy",
    "header",
    "leading",
    "trailing",
    "footer",
    "footerEnd",
  ]);

  const send = () => {
    const value = (own.value ?? "").trim();
    if (!value || own.disabled || own.busy) return;
    own.onSubmit?.(value);
    own.onValueChange?.("");
  };

  // An empty slot leaves no part in the anatomy — the bare vessel
  // keeps its single-line posture.
  const row = (part: string, content: JSX.Element | undefined) =>
    content != null ? (
      <div data-scope="ai" data-part={part}>
        {content}
      </div>
    ) : null;

  const seal = () =>
    own.busy ? (
      <Button
        variant="solid"
        size="sm"
        square
        type="button"
        aria-label="Stop"
        disabled={own.disabled}
        onClick={() => own.onStop?.()}
      >
        {stopGlyph()}
      </Button>
    ) : (
      <Button
        variant="solid"
        size="sm"
        square
        type="submit"
        aria-label="Send"
        disabled={own.disabled || !(own.value ?? "").trim()}
      >
        {arrowUpGlyph()}
      </Button>
    );

  // With a tool row beneath, the seal sinks into it — the send
  // belongs at the row's far end, with the tools.
  const trailing = () => (own.footer != null ? own.trailing : (own.trailing ?? seal()));

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
      {row("prompt-header", own.header)}
      <div data-scope="ai" data-part="prompt-main">
        {row("prompt-leading", own.leading)}
        <Field.Root>
          <Field.Textarea
            autoresize
            rows={1}
            value={own.value ?? ""}
            placeholder={own.placeholder ?? "Send a message"}
            disabled={own.disabled}
            onInput={(event) => own.onValueChange?.(event.currentTarget.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                send();
              }
            }}
          />
        </Field.Root>
        {row("prompt-trailing", trailing())}
      </div>
      <Show when={own.footer != null}>
        <div data-scope="ai" data-part="prompt-footer">
          {own.footer}
          <div data-scope="ai" data-part="prompt-end">
            {own.footerEnd}
            {seal()}
          </div>
        </div>
      </Show>
    </form>
  );
}

injectComponentStyle("ai");

export { PromptInput as AiPromptInput };
