import { injectComponentStyle } from "@bysages/core";
import type { HTMLAttributes, ReactNode } from "react";
import { useRef } from "react";

import { Button } from "../button";
import { Field } from "../field";
import { MentionsVessel, useMentions } from "../mentions";
import type { MentionEntry } from "../mentions";

const arrowUpGlyph = (
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
);

const stopGlyph = (
  <svg viewBox="0 0 16 16" width={14} height={14} aria-hidden="true">
    <rect x={4.5} y={4.5} width={7} height={7} fill="currentColor" />
  </svg>
);

/** An empty slot leaves no part in the anatomy — the bare vessel keeps
 * its single-line posture. */
function row(part: string, content: ReactNode): ReactNode {
  if (content == null || (Array.isArray(content) && content.length === 0)) return null;
  return (
    <div data-scope="ai" data-part={part}>
      {content}
    </div>
  );
}

/**
 * The prompt vessel: the shared field textarea — self-growing on the
 * machine's autoresize — with the submit seal riding its last line.
 * Around the body, props answer the composer's anatomy: `header` for
 * attachments riding above, `leading` for the tools at the text's
 * left, `trailing` for the seal itself, `footer` for the tools beneath,
 * and `footerEnd` for the controls that close the footer row — the
 * seal falls there by default, so a model picker dropped in rides the
 * send's shoulder. Controlled — bind `value` and take the text on
 * `submit`. Enter sends; Shift+Enter breaks the line. While `busy`
 * the seal becomes a stop seal and Enter holds its breath.
 */
export interface PromptInputProps extends Omit<HTMLAttributes<HTMLFormElement>, "onSubmit"> {
  /** The draft in the vessel — bind `value`; it clears itself on a
   * successful submit. */
  value: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onStop?: () => void;
  /** The quiet invitation before the reader types. */
  placeholder?: string;
  /** Still the words on the canvas, but the submit seal does nothing
   * and Enter stays a line break. */
  disabled?: boolean;
  /** The machine is working — the seal becomes a stop seal and Enter
   * holds its breath. */
  busy?: boolean;
  /** Mention candidates for the field: pass the roster and the summon
   * character (`@` unless told otherwise) and the vessel rides the
   * textarea. While candidates are up, Enter inserts and the send
   * waits. */
  mentions?: { items: MentionEntry[]; trigger?: string };
  header?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  footer?: ReactNode;
  footerEnd?: ReactNode;
}

export function PromptInput({
  value,
  onValueChange,
  onSubmit,
  onStop,
  placeholder = "Send a message",
  disabled = false,
  busy = false,
  mentions,
  header,
  leading,
  trailing,
  footer,
  footerEnd,
  ...rest
}: PromptInputProps) {
  // The field part is a component; its ref carries the textarea itself.
  const fieldRef = useRef<HTMLTextAreaElement | null>(null);

  const mentionState = useMentions(
    () => ({ items: mentions?.items ?? [], trigger: mentions?.trigger }),
    () => fieldRef.current,
    {
      getText: () => fieldRef.current?.value ?? value,
      setText: (next) => onValueChange?.(next),
    },
  );
  // The vessel only rides along when a roster was actually given.
  const mentionsActive = mentions != null;

  const submit = () => {
    const text = value.trim();
    if (!text || disabled || busy) return;
    onSubmit?.(text);
    onValueChange?.("");
  };

  const seal = busy ? (
    <Button
      variant="solid"
      size="sm"
      square
      type="button"
      aria-label="Stop"
      disabled={disabled}
      onClick={() => onStop?.()}
    >
      {stopGlyph}
    </Button>
  ) : (
    <Button
      variant="solid"
      size="sm"
      square
      type="submit"
      aria-label="Send"
      disabled={disabled || !value.trim()}
    >
      {arrowUpGlyph}
    </Button>
  );

  const hasFooter = footer != null && (!Array.isArray(footer) || footer.length > 0);

  return (
    <form
      {...rest}
      data-scope="ai"
      data-part="prompt"
      onSubmit={(event) => {
        event.preventDefault();
        submit();
      }}
    >
      {row("prompt-header", header)}
      <div data-scope="ai" data-part="prompt-main">
        {row("prompt-leading", leading)}
        <Field.Root>
          <Field.Textarea
            ref={fieldRef}
            autoresize
            rows={1}
            value={value}
            placeholder={placeholder}
            disabled={disabled}
            onChange={(event) => {
              onValueChange?.(event.target.value);
              mentionState.onInput();
            }}
            onKeyDown={(event) => {
              // The candidates eat their keys first; only on a quiet
              // field does Enter become the send.
              if (mentionState.onKeydown(event)) return;
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                submit();
              }
            }}
          />
        </Field.Root>
        {mentionsActive ? (
          <MentionsVessel
            open={mentionState.open}
            matches={mentionState.matches}
            active={mentionState.active}
            anchor={fieldRef.current}
            onInsert={mentionState.insert}
            onActiveChange={mentionState.setActive}
            onOpenChange={(open) => {
              if (!open) mentionState.close();
            }}
          />
        ) : null}
        {/* With a tool row beneath, the seal sinks into it — the send
            belongs at the row's far end, with the tools. */}
        {row("prompt-trailing", hasFooter ? trailing : (trailing ?? seal))}
      </div>
      {hasFooter ? (
        <div data-scope="ai" data-part="prompt-footer">
          {footer}
          {/* The row closes with an end group: the caller's send-side
              controls, with the seal as their quiet last member. */}
          {row(
            "prompt-end",
            footerEnd == null ? (
              seal
            ) : (
              <>
                {footerEnd}
                {seal}
              </>
            ),
          )}
        </div>
      ) : null}
    </form>
  );
}

injectComponentStyle("ai");

export { PromptInput as AiPromptInput };
