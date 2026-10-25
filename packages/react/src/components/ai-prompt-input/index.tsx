import { injectComponentStyle } from "@bysages/core/styling";
import type { HTMLAttributes, ReactNode } from "react";
import { useEffect, useRef } from "react";

import { withSelfRoot } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { useComponentMessages } from "../../internal/messages";
import { Button } from "../button";
import { Field } from "../field";
import type { MentionCommitKey, MentionEntry } from "../mentions";
import type { MentionPlacement } from "../mentions";
import { MentionsVessel, useMentions } from "../mentions";
import {
  insertEditorToken,
  insertLineBreak,
  readCaret,
  renderEditor,
  serializeEditor,
  setEditorCaret,
} from "./editor";

const arrowUpIcon = iconNode("arrow-up", { width: 14, height: 14 });

const stopIcon = iconNode("square", { width: 14, height: 14 });

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
 * machine's autoresize — with the submit seal riding its last line. With
 * mentions it becomes a token editor; the bound value remains plain text.
 */
export interface PromptInputProps extends Omit<
  HTMLAttributes<HTMLFormElement>,
  "onSubmit" | "onSelect"
> {
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
  /** Mention candidates. Rich tokens render after a choice; the value
   * stays ordinary composer text. */
  mentions?: {
    items: MentionEntry[];
    trigger?: string;
    triggers?: string | string[];
    insertOnSelect?: boolean;
    commitKeys?: MentionCommitKey[];
    placement?: MentionPlacement;
    clearQueryOnSelect?: boolean;
  };
  /** The whole mention entry was selected. */
  onSelect?: (entry: MentionEntry) => void;
  header?: ReactNode;
  leading?: ReactNode;
  trailing?: ReactNode;
  footer?: ReactNode;
  footerEnd?: ReactNode;
}

function PromptInputImpl({
  value,
  onValueChange,
  onSubmit,
  onStop,
  placeholder,
  "aria-label": ariaLabel,
  disabled = false,
  busy = false,
  mentions,
  onSelect,
  header,
  leading,
  trailing,
  footer,
  footerEnd,
  ...rest
}: PromptInputProps) {
  injectComponentStyle("ai");
  const fieldRef = useRef<HTMLTextAreaElement | null>(null);
  const editorRef = useRef<HTMLDivElement | null>(null);
  const hostId = useElementId("ai-prompt", rest);
  const messages = useComponentMessages();
  const placeholderText = placeholder ?? messages.ai.conversation;
  const mentionsActive = mentions != null;

  const mentionState = useMentions(
    () => ({
      items: mentions?.items ?? [],
      trigger: mentions?.trigger,
      triggers: mentions?.triggers,
      commitKeys: mentions?.commitKeys ?? ["Enter", " ", "Tab"],
    }),
    () => fieldRef.current,
    {
      getCaret: () => (mentions ? readCaret(editorRef.current!) : undefined),
      getText: () =>
        mentions ? serializeEditor(editorRef.current!) : (fieldRef.current?.value ?? value),
      setText: (next) => onValueChange?.(next),
      select: (entry) => {
        onSelect?.(entry);
        const insert = mentions?.insertOnSelect !== false;
        return insert || mentions?.clearQueryOnSelect !== false;
      },
      commit: (entry) => insertChoice(entry),
    },
  );

  useEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    renderEditor(editor, value, mentions?.items ?? [], mentions?.triggers);
    editor.toggleAttribute("data-empty", !value);
  });

  const publishEditor = () => {
    const editor = editorRef.current;
    if (!editor) return;
    const next = serializeEditor(editor);
    editor.toggleAttribute("data-empty", !next);
    onValueChange?.(next);
  };

  const insertChoice = (entry: MentionEntry) => {
    const editor = editorRef.current;
    const clearQuery = mentions?.insertOnSelect === false && mentions?.clearQueryOnSelect !== false;
    if (!editor || entry.disabled || (mentions?.insertOnSelect === false && !clearQuery)) {
      mentionState.close();
      return;
    }

    if (clearQuery) {
      const text = serializeEditor(editor);
      const next =
        text.slice(0, mentionState.anchorIndex.current) +
        text.slice(mentionState.caretIndex.current);
      renderEditor(editor, next, mentions?.items ?? [], mentions?.triggers);
      editor.toggleAttribute("data-empty", !next);
      editor.focus();
      setEditorCaret(editor, mentionState.anchorIndex.current);
      onValueChange?.(next);
      mentionState.close();
      return;
    }

    onSelect?.(entry);
    const next = insertEditorToken(
      editor,
      entry,
      mentionState.activeTrigger.current,
      mentionState.anchorIndex.current,
      mentionState.caretIndex.current,
    );
    editor.toggleAttribute("data-empty", !next);
    onValueChange?.(next);
    mentionState.close();
  };

  const submit = () => {
    const text = value.trim();
    if (!text || disabled || busy) return;
    onSubmit?.(text);
    onValueChange?.("");
  };

  const editorKeydown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.nativeEvent.isComposing || event.keyCode === 229) return;

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      const editor = editorRef.current;
      if (!editor) return;
      onValueChange?.(insertLineBreak(editor));
      return;
    }

    if (mentionState.onKeydown(event)) return;

    if (event.key === "Enter") {
      event.preventDefault();
      submit();
    }
  };

  const seal = busy ? (
    <Button
      variant="solid"
      size="sm"
      square
      type="button"
      aria-label={messages.ai.stop}
      disabled={disabled}
      onClick={() => onStop?.()}
    >
      {stopIcon}
    </Button>
  ) : (
    <Button
      variant="solid"
      size="sm"
      square
      type="submit"
      aria-label={messages.ai.send}
      disabled={disabled || !value.trim()}
    >
      {arrowUpIcon}
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
        {mentionsActive ? (
          <div
            ref={editorRef}
            contentEditable={!disabled}
            role="combobox"
            aria-autocomplete="list"
            tabIndex={disabled ? undefined : 0}
            aria-label={ariaLabel ?? messages.ai.conversation}
            aria-expanded={mentionState.open}
            aria-controls={mentionState.open ? `${hostId}:mentions:popup` : undefined}
            aria-disabled={disabled || undefined}
            data-scope="ai"
            data-part="prompt-editor"
            data-empty={value ? undefined : ""}
            data-placeholder={placeholderText}
            data-disabled={disabled || undefined}
            onInput={() => {
              publishEditor();
              if (!disabled) mentionState.onInput();
            }}
            onKeyDown={editorKeydown}
          />
        ) : (
          <Field.Root>
            <Field.Textarea
              ref={fieldRef}
              autoresize
              rows={1}
              value={value}
              placeholder={placeholderText}
              aria-label={ariaLabel ?? messages.ai.conversation}
              disabled={disabled}
              onChange={(event) => {
                onValueChange?.(event.target.value);
                mentionState.onInput();
              }}
              onKeyDown={(event) => {
                if (event.nativeEvent.isComposing || event.keyCode === 229) return;
                if (mentionState.onKeydown(event)) return;
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  submit();
                }
              }}
            />
          </Field.Root>
        )}
        {mentionsActive ? (
          <MentionsVessel
            id={`${hostId}:mentions`}
            open={mentionState.open}
            matches={mentionState.matches}
            active={mentionState.active}
            anchor={editorRef.current}
            placement={mentions?.placement ?? "top-start"}
            onInsert={insertChoice}
            onActiveChange={mentionState.setActive}
            onOpenChange={(open) => {
              if (!open) mentionState.close();
            }}
          />
        ) : null}
        {row("prompt-trailing", hasFooter ? trailing : (trailing ?? seal))}
      </div>
      {hasFooter ? (
        <div data-scope="ai" data-part="prompt-footer">
          {footer}
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

export const PromptInput = withSelfRoot(PromptInputImpl);
export { PromptInput as AiPromptInput };
