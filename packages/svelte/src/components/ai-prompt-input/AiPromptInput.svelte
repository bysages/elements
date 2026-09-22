<script lang="ts">
import { Button } from "../button";
import { Field } from "../field";
import { MentionsVessel, useMentions } from "../mentions";
import type { MentionEntry } from "../mentions";

import type { PromptInputProps } from "./props";

let {
  value = $bindable(""),
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
}: PromptInputProps = $props();

let textareaEl = $state<HTMLTextAreaElement | null>(null);

const mentionState = useMentions(
  () => ({ items: mentions?.items ?? [], trigger: mentions?.trigger }),
  () => textareaEl,
  {
    getText: () => textareaEl?.value ?? value,
    setText: (next: string) => {
      value = next;
      onValueChange?.(next);
    },
  },
);
// The vessel only rides along when a roster was actually given.
const mentionsActive = $derived(mentions != null);

function send() {
  const text = value.trim();
  if (!text || disabled || busy) return;
  onSubmit?.(text);
  value = "";
  onValueChange?.("");
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
      aria-label="Stop"
      {disabled}
      onclick={() => onStop?.()}
    >
      <svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true">
        <rect x="4.5" y="4.5" width="7" height="7" fill="currentColor" />
      </svg>
    </Button>
  {:else}
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
    </Button>
  {/if}
{/snippet}

<!-- The prompt vessel: the shared field textarea — self-growing on the
machine's autoresize — with the submit seal riding its last line.
Around the body, snippets answer the composer's anatomy: `header` for
attachments riding above, `leading` for the tools at the text's left,
`trailing` for the seal itself, `footer` for the tools beneath, and
`footerEnd` for the controls that close the footer row — the seal falls
there by default, so a model picker dropped in rides the send's
shoulder. Controlled — `bind:value` mirrors the field, `onSubmit` hands
back the text. Enter sends; Shift+Enter breaks the line. While `busy`
the seal becomes a stop seal and Enter holds its breath. -->
<form
  {...rest}
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
    <Field.Root>
      <Field.Textarea
        bind:ref={textareaEl}
        bind:value
        autoresize
        rows={1}
        {placeholder}
        {disabled}
        oninput={() => mentionState.onInput()}
        onkeydown={(event) => {
          // The candidates eat their keys first; only on a quiet
          // field does Enter become the send.
          if (mentionState.onKeydown(event)) return;
          if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            send();
          }
        }}
      />
    </Field.Root>
    {#if mentionsActive}
      <MentionsVessel
        open={mentionState.open}
        matches={mentionState.matches}
        active={mentionState.active}
        anchor={textareaEl}
        onInsert={mentionState.insert}
        onActiveChange={(index) => (mentionState.active = index)}
        onOpenChange={(open) => {
          if (!open) mentionState.close();
        }}
      />
    {/if}
    <!-- With a tool row beneath, the seal sinks into it — the send
        belongs at the row's far end, with the tools. -->
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
      <!-- The row closes with an end group: the caller's send-side
          controls, with the seal as their quiet last member. -->
      <div data-scope="ai" data-part="prompt-end">
        {#if footerEnd}{@render footerEnd()}{/if}
        {@render seal()}
      </div>
    </div>
  {/if}
</form>
