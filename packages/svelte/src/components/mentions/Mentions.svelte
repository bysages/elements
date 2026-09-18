<script lang="ts">
import { Field } from "../field";

import MentionsVessel from "./MentionsVessel.svelte";
import { useMentions } from "./use-mentions.svelte";
import type { MentionsProps } from "./props";

let {
  items = [],
  value = $bindable(""),
  trigger = "@",
  placeholder,
  autoresize = false,
  invalid = false,
  onValueChange,
  ...rest
}: MentionsProps = $props();

// The field part's element — the caret's home and the vessel's anchor.
let textareaEl = $state<HTMLTextAreaElement | null>(null);

const mentions = useMentions(
  () => ({ items, trigger }),
  () => textareaEl,
  {
    getText: () => textareaEl?.value ?? value,
    setText: (next) => {
      value = next;
      onValueChange?.(next);
    },
  },
);

function onInput(event: Event & { currentTarget: HTMLTextAreaElement }) {
  onValueChange?.(event.currentTarget.value);
  mentions.onInput();
}
</script>

<!-- @-mentions: a plain textarea that, when the text before the caret
ends with the trigger character followed by a token, offers the
matching candidates in a small anchored vessel; choosing one replaces
the token with `trigger + label` and hands the whole text back through
`bind:value`. Arrows move, Enter inserts, Escape dismisses.

The field is the shared `Field.Textarea` — field wiring (label ids,
the invalid state, autoresize) rides on it for free — and the vessel
anchors to the field as a whole (popover machinery), not to the caret
coordinates; caret-precise positioning would need a second positioning
system for no practical gain at typical field sizes. Composers that
keep their own field anatomy (the AI prompt input) skip this shell and
wire `useMentions` plus `MentionsVessel` themselves. -->
<div {...rest} data-scope="mentions" data-part="root">
  <Field.Textarea
    bind:ref={textareaEl}
    bind:value
    autoresize={autoresize}
    rows={3}
    {placeholder}
    aria-invalid={invalid ? "true" : undefined}
    data-scope="mentions"
    data-part="textarea"
    oninput={onInput}
    onkeydown={mentions.onKeydown}
  />
  <MentionsVessel
    open={mentions.open}
    matches={mentions.matches}
    active={mentions.active}
    anchor={textareaEl}
    onInsert={mentions.insert}
    onActiveChange={(index) => (mentions.active = index)}
    onOpenChange={(open) => {
      if (!open) mentions.close();
    }}
  />
</div>
