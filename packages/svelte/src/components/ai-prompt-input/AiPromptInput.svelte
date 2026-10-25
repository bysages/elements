<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("ai");

import { Button } from "../button";
import { Field } from "../field";
import InternalIcon from "../../internal/InternalIcon.svelte";
import { iconHtml } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { MentionsVessel, useMentions } from "../mentions";

import { useComponentMessages } from "../config-provider/messages";
import type { MentionEntry } from "../mentions";
import {
  insertEditorToken,
  insertLineBreak,
  readCaret,
  renderEditor,
  serializeEditor,
} from "./editor";

import type { PromptInputProps } from "./props";

let {
  value = $bindable(""),
  onValueChange,
  onSubmit,
  onStop,
  placeholder,
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
}: PromptInputProps = $props();

const generatedId = $props.id();
const hostId = $derived(useElementId("ai-prompt", generatedId, rest.id));
const mentionsId = $derived(`${hostId}:mentions`);

let textareaEl = $state<HTMLTextAreaElement | null>(null);
let editorEl = $state<HTMLElement | null>(null);
const mentionsActive = $derived(mentions != null);

const messages = useComponentMessages();
const placeholderText = $derived(placeholder ?? messages().ai.conversation);

const mentionState = useMentions(
  () => ({
    items: mentions?.items ?? [],
    trigger: mentions?.trigger,
    triggers: mentions?.triggers,
    commitKeys: mentions?.commitKeys ?? ["Enter", " ", "Tab"],
  }),
  () => textareaEl,
  {
    getCaret: () => (mentions && editorEl ? readCaret(editorEl) : undefined),
    getText: () =>
      mentions && editorEl ? serializeEditor(editorEl) : (textareaEl?.value ?? value),
    setText: (next: string) => {
      value = next;
      onValueChange?.(next);
    },
    select: (entry: MentionEntry) => {
      onSelect?.(entry);
      const insert = mentions?.insertOnSelect !== false;
      return insert || mentions?.clearQueryOnSelect !== false;
    },
    commit: insertChoice,
  },
);

$effect(() => {
  if (!editorEl) return;
  renderEditor(editorEl, value, mentions?.items ?? [], mentions?.triggers);
  editorEl.toggleAttribute("data-empty", !value);
});

function publishEditor() {
  if (!editorEl) return;
  const next = serializeEditor(editorEl);
  editorEl.toggleAttribute("data-empty", !next);
  value = next;
  onValueChange?.(next);
}

function insertChoice(entry: MentionEntry) {
  const clearQuery =
    mentions?.insertOnSelect === false && mentions?.clearQueryOnSelect !== false;
  if (!editorEl || entry.disabled || (mentions?.insertOnSelect === false && !clearQuery)) {
    mentionState.close();
    return;
  }

  if (clearQuery) {
    const text = serializeEditor(editorEl);
    const next =
      text.slice(0, mentionState.anchorIndex) + text.slice(mentionState.caretIndex);
    renderEditor(editorEl, next, mentions?.items ?? [], mentions?.triggers);
    editorEl.toggleAttribute("data-empty", !next);
    editorEl.focus();
    value = next;
    onValueChange?.(next);
    mentionState.close();
    return;
  }

  onSelect?.(entry);
  const next = insertEditorToken(
    editorEl,
    entry,
    mentionState.activeTrigger,
    mentionState.anchorIndex,
    mentionState.caretIndex,
  );
  editorEl.toggleAttribute("data-empty", !next);
  value = next;
  onValueChange?.(next);
  mentionState.close();
}

function send() {
  const text = value.trim();
  if (!text || disabled || busy) return;
  onSubmit?.(text);
  value = "";
  onValueChange?.("");
}

function editorKeydown(event: KeyboardEvent) {
  if (event.isComposing || event.keyCode === 229) return;

  if (event.key === "Enter" && event.shiftKey) {
    event.preventDefault();
    if (!editorEl) return;
    value = insertLineBreak(editorEl);
    onValueChange?.(value);
    return;
  }

  if (mentionState.onKeydown(event)) return;

  if (event.key === "Enter") {
    event.preventDefault();
    send();
  }
}

const hasFooter = $derived(footer != null);
</script>

{#snippet seal()}
  {#if busy}
    <Button
      variant="solid"
      size="sm"
      square
      type="button"
      aria-label={messages().ai.stop}
      {disabled}
      onclick={() => onStop?.()}
    >
      {@html iconHtml("square", { width: "14", height: "14" })}
    </Button>
  {:else}
    <Button
      variant="solid"
      size="sm"
      square
      type="submit"
      aria-label={messages().ai.send}
      disabled={disabled || !value.trim()}
    >
      <InternalIcon name="arrow-up" size="sm" />
    </Button>
  {/if}
{/snippet}

<!-- The prompt vessel: the shared field textarea — self-growing on the
machine's autoresize — with the submit seal riding its last line. With
mentions it renders rich tokens while the bound value remains text. -->
<form
  {...rest}
  id={hostId}
  data-scope="ai"
  data-part="prompt"
  onsubmit={(event) => {
    event.preventDefault();
    send();
  }}
>
  {#if header}
    <div data-scope="ai" data-part="prompt-header">{@render header()}</div>
  {/if}
  <div data-scope="ai" data-part="prompt-main">
    {#if leading}
      <div data-scope="ai" data-part="prompt-leading">{@render leading()}</div>
    {/if}
    {#if mentionsActive}
      <div
        bind:this={editorEl}
        contenteditable={!disabled}
        role="combobox"
        aria-autocomplete="list"
        tabindex={disabled ? undefined : 0}
        aria-label={messages().ai.conversation}
        aria-expanded={mentionState.open ? "true" : undefined}
        aria-controls={mentionState.open ? `${mentionsId}:popup` : undefined}
        aria-disabled={disabled || undefined}
        data-scope="ai"
        data-part="prompt-editor"
        data-empty={value ? undefined : ""}
        data-placeholder={placeholderText}
        data-disabled={disabled || undefined}
        oninput={() => {
          publishEditor();
          if (!disabled) mentionState.onInput();
        }}
        onkeydown={editorKeydown}
      ></div>
    {:else}
      <Field.Root>
        <Field.Textarea
          bind:ref={textareaEl}
          bind:value
          autoresize
          rows={1}
          {placeholderText}
          aria-label={messages().ai.conversation}
          disabled={disabled}
          oninput={() => mentionState.onInput()}
          onkeydown={(event) => {
            if (event.isComposing || event.keyCode === 229) return;
            if (mentionState.onKeydown(event)) return;
            if (event.key === "Enter" && !event.shiftKey) {
              event.preventDefault();
              send();
            }
          }}
        />
      </Field.Root>
    {/if}
    {#if mentionsActive}
      <MentionsVessel
        id={mentionsId}
        open={mentionState.open}
        matches={mentionState.matches}
        active={mentionState.active}
        anchor={editorEl}
        placement={mentions?.placement ?? "top-start"}
        onInsert={insertChoice}
        onActiveChange={(index) => (mentionState.active = index)}
        onOpenChange={(open) => {
          if (!open) mentionState.close();
        }}
      />
    {/if}
    {#if !hasFooter || trailing}
      <div data-scope="ai" data-part="prompt-trailing">
        {#if trailing}{@render trailing()}{/if}
        {#if !hasFooter}{@render seal()}{/if}
      </div>
    {/if}
  </div>
  {#if hasFooter}
    <div data-scope="ai" data-part="prompt-footer">
      {@render footer()}
      <div data-scope="ai" data-part="prompt-end">
        {#if footerEnd}{@render footerEnd()}{/if}
        {@render seal()}
      </div>
    </div>
  {/if}
</form>
