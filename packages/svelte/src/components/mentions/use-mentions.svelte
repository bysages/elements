<script module lang="ts">
import { tick } from "svelte";

import type { MentionEntry, UseMentionsHandlers, UseMentionsOptions } from "./props";

/** The @-detection machinery behind a mention field: watch the caret,
 * offer the matching candidates, and answer for the keys that drive
 * them. The field element arrives as a getter because hosts wrap it
 * differently (a bare textarea, a field part's `ref`).
 *
 * `onKeydown` answers whether the vessel consumed the key, so a host
 * with its own Enter semantics — a composer that sends — can yield to
 * the candidates first and act only when the vessel stands down. */
export function useMentions(
  options: () => UseMentionsOptions,
  textarea: () => HTMLTextAreaElement | null,
  handlers: UseMentionsHandlers,
) {
  const state = $state({
    open: false,
    matches: [] as MentionEntry[],
    active: 0,
  });

  // Where the trigger character sits, and where the caret was — the
  // token between them is what a choice replaces.
  let anchorIndex = 0;
  let caretIndex = 0;

  function closePopup() {
    state.open = false;
    state.matches = [];
  }

  function detect() {
    const text = handlers.getText();
    const el = textarea();
    const caret = el?.selectionStart ?? text.length;
    caretIndex = caret;
    const head = text.slice(0, caret);
    const char = options().trigger ?? "@";
    const anchor = head.lastIndexOf(char);
    const token = anchor === -1 ? "" : head.slice(anchor + char.length);
    // A token ends at the first space: mentions name one subject.
    if (anchor === -1 || /\s/.test(token)) {
      closePopup();
      return;
    }
    const found = options().items.filter((entry) =>
      entry.label.toLowerCase().startsWith(token.toLowerCase()),
    );
    state.matches = found;
    state.active = 0;
    anchorIndex = anchor;
    state.open = found.length > 0;
  }

  async function insert(entry: MentionEntry) {
    const text = handlers.getText();
    const char = options().trigger ?? "@";
    const next =
      text.slice(0, anchorIndex) + char + entry.label + " " + text.slice(caretIndex);
    handlers.setText(next);
    closePopup();
    // The field must hold the new text before the caret lands in it.
    await tick();
    const el = textarea();
    if (!el) return;
    const caret = anchorIndex + char.length + entry.label.length + 1;
    el.focus();
    el.setSelectionRange(caret, caret);
  }

  /** Feed the field's input events through here — the vessel watches
   * the text as it lands, from the element itself. */
  function onInput() {
    detect();
  }

  /** Arrows move, Enter inserts, Escape dismisses. Answers `true` when
   * the vessel consumed the key. */
  function onKeydown(event: KeyboardEvent): boolean {
    if (!state.open || state.matches.length === 0) return false;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      state.active = (state.active + 1) % state.matches.length;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      state.active = (state.active - 1 + state.matches.length) % state.matches.length;
    } else if (event.key === "Enter") {
      // Enter is the insert answer while the vessel is up — never a
      // newline, and never the host's own action.
      event.preventDefault();
      void insert(state.matches[state.active]);
    } else if (event.key === "Escape") {
      closePopup();
    } else {
      return false;
    }
    return true;
  }

  return {
    get open() {
      return state.open;
    },
    set open(value: boolean) {
      state.open = value;
    },
    get matches() {
      return state.matches;
    },
    get active() {
      return state.active;
    },
    set active(value: number) {
      state.active = value;
    },
    insert,
    close: closePopup,
    onInput,
    onKeydown,
  };
}
</script>
