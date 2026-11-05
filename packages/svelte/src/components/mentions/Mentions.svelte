<script lang="ts">
import { injectComponentStyle } from "@bysages/core/styling";
injectComponentStyle("mentions");

import { Field } from "../field";

import MentionsVessel from "./MentionsVessel.svelte";
import { useMentions } from "./use-mentions.svelte";
import { useElementId } from "../../internal/id";
import type { MentionsProps } from "./props";

let {
  items = [],
  value = $bindable(""),
  trigger = "@",
  triggers,
  insertOnSelect = true,
  commitKeys,
  placement = "bottom-start",
  placeholder,
  autoresize = false,
  invalid = false,
  size = "md",
  onValueChange,
  onSelect,
  portal = false,
  ...rest
}: MentionsProps = $props();

const generatedId = $props.id();
const hostId = $derived(useElementId("mentions", generatedId, rest.id));

// The field part's element — the caret's home and the vessel's anchor.
let textareaEl = $state<HTMLTextAreaElement | null>(null);

const mentions = useMentions(
  () => ({ items, trigger, triggers, commitKeys }),
  () => textareaEl,
  {
    getText: () => textareaEl?.value ?? value,
    setText: (next) => {
      value = next;
      onValueChange?.(next);
    },
    select: (entry) => {
      onSelect?.(entry);
      return insertOnSelect;
    },
  },
);

function onInput(event: Event & { currentTarget: HTMLTextAreaElement }) {
  onValueChange?.(event.currentTarget.value);
  mentions.onInput();
}
</script>

<!-- @-mentions: a plain textarea that, when the text before the caret
ends with a trigger character followed by a token, offers the matching
candidates in a small anchored vessel; choosing one replaces the token
with the same trigger and the candidate's label. Arrows move, Enter or
Space inserts, Escape dismisses.

The field is the shared `Field.Textarea` — field wiring (label ids,
the invalid state, autoresize) rides on it for free — and the vessel
anchors to the field as a whole (popover machinery), not to the caret
coordinates; caret-precise positioning would need a second positioning
system for no practical gain at typical field sizes. Composers that
keep their own field anatomy (the AI prompt input) skip this shell and
wire `useMentions` plus `MentionsVessel` themselves. -->
<div {...rest} id={hostId} data-scope="mentions" data-part="root" data-size={size}>
  <MentionsVessel
    id={`${hostId}:vessel`}
    open={mentions.open}
    matches={mentions.matches}
    active={mentions.active}
    size={size}
    {placement}
    {portal}
    onInsert={mentions.insert}
    onActiveChange={(index) => (mentions.active = index)}
    onOpenChange={(open) => {
      if (!open) mentions.close();
    }}
  >
    {#snippet children(anchorProps)}
      <Field.Textarea
        {...anchorProps()}
        bind:ref={textareaEl}
        bind:value
        autoresize={autoresize}
        rows={3}
        {placeholder}
        aria-expanded={mentions.open ? "true" : undefined}
        aria-controls={mentions.open ? `${hostId}:vessel:popup` : undefined}
        aria-invalid={invalid ? "true" : undefined}
        data-scope="mentions"
        data-part="textarea"
        oninput={onInput}
        onkeydown={mentions.onKeydown}
      />
    {/snippet}
  </MentionsVessel>
</div>
