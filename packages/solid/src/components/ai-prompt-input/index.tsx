import { injectComponentStyle } from "@bysages/core/styling";
import { Show, createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { withSelfRoot } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { Button } from "../button";
import { useComponentMessages } from "../config-provider/use-component-messages";
import { Field } from "../field";
import { MentionsVessel, type MentionEntry, type MentionTriggers } from "../mentions";
import { useMentions } from "../mentions/use-mentions";

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
  /** Mention candidates for the field: pass the roster and the summon
   * character(s) (`@` unless told otherwise) and the vessel rides the
   * textarea. While candidates are up, Enter inserts and the send waits. */
  mentions?: {
    items: MentionEntry[];
    trigger?: string;
    triggers?: MentionTriggers;
    insertOnSelect?: boolean;
  };
  /** A candidate was chosen, including when `mentions.insertOnSelect`
   * keeps the composer text untouched. */
  onSelect?: (entry: MentionEntry) => void;
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

  const mentions = useMentions(
    () => ({
      items: own.mentions?.items ?? [],
      trigger: own.mentions?.trigger,
      triggers: own.mentions?.triggers,
    }),
    fieldEl,
    {
      getText: () => fieldEl()?.value ?? own.value ?? "",
      setText: (next) => own.onValueChange?.(next),
      select: (entry) => {
        own.onSelect?.(entry);
        return own.mentions?.insertOnSelect !== false;
      },
    },
  );
  const mentionsActive = () => own.mentions != null;

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
            ref={(node) => setFieldEl(node)}
            autoresize
            rows={1}
            value={own.value ?? ""}
            placeholder={own.placeholder ?? messages().ai.send}
            aria-label={messages().ai.conversation}
            aria-expanded={mentions.open()}
            aria-controls={mentions.open() ? `${mentionsId()}:popup` : undefined}
            disabled={own.disabled}
            onInput={(event) => {
              own.onValueChange?.(event.currentTarget.value);
              mentions.onInput();
            }}
            onKeyDown={(event) => {
              // IME Enter is composition, not a send.
              if (event.isComposing || event.keyCode === 229) return;
              // The candidates eat their keys first; only on a
              // quiet field does Enter become the send.
              if (mentions.onKeydown(event)) return;
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                send();
              }
            }}
          />
        </Field.Root>
        <Show when={mentionsActive()}>
          <MentionsVessel
            open={mentions.open()}
            matches={mentions.matches()}
            active={mentions.active()}
            anchor={fieldEl()}
            id={mentionsId()}
            onInsert={mentions.insert}
            onActiveChange={mentions.setActive}
            onOpenChange={(open) => {
              if (!open) mentions.close();
            }}
          />
        </Show>
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
});
export { PromptInput as AiPromptInput };
