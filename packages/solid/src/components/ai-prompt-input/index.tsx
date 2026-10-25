import { injectComponentStyle } from "@bysages/core/styling";
import { Show, createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { withSelfRoot } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { Button } from "../button";
import { useComponentMessages } from "../config-provider/use-component-messages";
import { Field } from "../field";
import {
  MentionsVessel,
  type MentionCommitKey,
  type MentionEntry,
  type MentionPlacement,
  type MentionTriggers,
} from "../mentions";
import { useMentions } from "../mentions/use-mentions";
import {
  insertEditorToken,
  insertLineBreak,
  readCaret,
  renderEditor,
  serializeEditor,
  setEditorCaret,
} from "./editor";

function arrowUpIcon() {
  return iconNode("arrow-up", { width: "14", height: "14" });
}

function stopIcon() {
  return iconNode("square", { width: "14", height: "14" });
}

export interface PromptInputProps extends Omit<
  JSX.HTMLAttributes<HTMLFormElement>,
  "onSubmit" | "onSelect" | "value"
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
  /** Mention candidates. Rich tokens render after a choice; the
   * bound value remains plain text. */
  mentions?: {
    items: MentionEntry[];
    trigger?: string;
    triggers?: MentionTriggers;
    insertOnSelect?: boolean;
    commitKeys?: MentionCommitKey[];
    placement?: MentionPlacement;
    clearQueryOnSelect?: boolean;
  };
  /** A candidate was chosen, including when `mentions.insertOnSelect`
   * keeps the composer text untouched. */
  onSelect?: (entry: MentionEntry) => void;
}

/** The prompt vessel: the shared field textarea — self-growing on the
 * machine's autoresize — with the submit seal riding its last line.
 * With mentions it becomes a rich token editor while the value stays
 * ordinary composer text. */
export const PromptInput = withSelfRoot(function PromptInput(props: PromptInputProps) {
  injectComponentStyle("ai");
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
    "mentions",
    "onSelect",
  ]);

  const messages = useComponentMessages();
  const hostId = useElementId("ai-prompt", () => rest.id);
  const mentionsId = () => `${hostId()}:mentions`;
  const [fieldEl, setFieldEl] = createSignal<HTMLTextAreaElement | null>(null);
  const [editorEl, setEditorEl] = createSignal<HTMLElement | null>(null);
  const mentionsActive = () => own.mentions != null;

  const mentions = useMentions(
    () => ({
      items: own.mentions?.items ?? [],
      trigger: own.mentions?.trigger,
      triggers: own.mentions?.triggers,
      commitKeys: own.mentions?.commitKeys ?? ["Enter", " ", "Tab"],
    }),
    fieldEl,
    {
      getCaret: () => (own.mentions ? readCaret(editorEl()!) : undefined),
      getText: () =>
        own.mentions ? serializeEditor(editorEl()!) : (fieldEl()?.value ?? own.value ?? ""),
      setText: (next) => own.onValueChange?.(next),
      select: (entry) => {
        own.onSelect?.(entry);
        const insert = own.mentions?.insertOnSelect !== false;
        return insert || own.mentions?.clearQueryOnSelect !== false;
      },
      commit: (entry) => insertChoice(entry),
    },
  );

  const bindEditor = (node: HTMLElement) => {
    setEditorEl(node);
    renderEditor(node, own.value ?? "", own.mentions?.items ?? [], own.mentions?.triggers);
    node.toggleAttribute("data-empty", !own.value);
  };

  const publishEditor = () => {
    const editor = editorEl();
    if (!editor) return;
    const next = serializeEditor(editor);
    editor.toggleAttribute("data-empty", !next);
    own.onValueChange?.(next);
  };

  const insertChoice = (entry: MentionEntry) => {
    const editor = editorEl();
    const clearQuery =
      own.mentions?.insertOnSelect === false && own.mentions?.clearQueryOnSelect !== false;
    if (!editor || entry.disabled || (own.mentions?.insertOnSelect === false && !clearQuery)) {
      mentions.close();
      return;
    }

    if (clearQuery) {
      const text = serializeEditor(editor);
      const next = text.slice(0, mentions.anchorIndex()) + text.slice(mentions.caretIndex());
      renderEditor(editor, next, own.mentions?.items ?? [], own.mentions?.triggers);
      editor.toggleAttribute("data-empty", !next);
      editor.focus();
      setEditorCaret(editor, mentions.anchorIndex());
      own.onValueChange?.(next);
      mentions.close();
      return;
    }

    own.onSelect?.(entry);
    const next = insertEditorToken(
      editor,
      entry,
      mentions.activeTrigger(),
      mentions.anchorIndex(),
      mentions.caretIndex(),
    );
    editor.toggleAttribute("data-empty", !next);
    own.onValueChange?.(next);
    mentions.close();
  };

  const send = () => {
    const value = (own.value ?? "").trim();
    if (!value || own.disabled || own.busy) return;
    own.onSubmit?.(value);
    own.onValueChange?.("");
  };

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
        aria-label={messages().ai.stop}
        disabled={own.disabled}
        onClick={() => own.onStop?.()}
      >
        {stopIcon()}
      </Button>
    ) : (
      <Button
        variant="solid"
        size="sm"
        square
        type="submit"
        aria-label={messages().ai.send}
        disabled={own.disabled || !(own.value ?? "").trim()}
      >
        {arrowUpIcon()}
      </Button>
    );

  const editorKeydown = (event: KeyboardEvent) => {
    if (event.isComposing || event.keyCode === 229) return;

    if (event.key === "Enter" && event.shiftKey) {
      event.preventDefault();
      const editor = editorEl();
      if (!editor) return;
      own.onValueChange?.(insertLineBreak(editor));
      return;
    }

    if (mentions.onKeydown(event)) return;

    if (event.key === "Enter") {
      event.preventDefault();
      send();
    }
  };

  const hasFooter = () => own.footer != null;

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
        <Show
          when={mentionsActive()}
          fallback={
            <Field.Root>
              <Field.Textarea
                ref={setFieldEl}
                autoresize
                rows={1}
                value={own.value ?? ""}
                placeholder={own.placeholder ?? messages().ai.conversation}
                aria-label={messages().ai.conversation}
                disabled={own.disabled}
                onInput={() => mentions.onInput()}
                onKeyDown={(event) => {
                  if (event.isComposing || event.keyCode === 229) return;
                  if (mentions.onKeydown(event)) return;
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    send();
                  }
                }}
              />
            </Field.Root>
          }
        >
          <div
            ref={bindEditor}
            contentEditable={!own.disabled}
            role="combobox"
            aria-autocomplete="list"
            tabindex={own.disabled ? undefined : 0}
            aria-label={messages().ai.conversation}
            aria-expanded={mentions.open()}
            aria-controls={mentions.open() ? `${mentionsId()}:popup` : undefined}
            aria-disabled={own.disabled || undefined}
            data-scope="ai"
            data-part="prompt-editor"
            data-empty={!(own.value ?? "") ? "" : undefined}
            data-placeholder={own.placeholder ?? messages().ai.conversation}
            data-disabled={own.disabled || undefined}
            onInput={() => {
              publishEditor();
              if (!own.disabled) mentions.onInput();
            }}
            onKeyDown={editorKeydown}
          />
        </Show>
        <Show when={mentionsActive()}>
          <MentionsVessel
            id={mentionsId()}
            open={mentions.open()}
            matches={mentions.matches()}
            active={mentions.active()}
            anchor={editorEl()}
            placement={own.mentions?.placement ?? "top-start"}
            onInsert={insertChoice}
            onActiveChange={mentions.setActive}
            onOpenChange={(open) => {
              if (!open) mentions.close();
            }}
          />
        </Show>
        {row("prompt-trailing", hasFooter() ? own.trailing : (own.trailing ?? seal()))}
      </div>
      <Show when={hasFooter()}>
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
});
