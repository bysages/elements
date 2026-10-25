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

  // Where the trigger character sits, where the caret was, and which of
  // the summoning characters opened the live token.
  let anchorIndex = 0;
  let caretIndex = 0;
  let activeTrigger = "@";

  function triggers(): string[] {
    const value = options().triggers ?? options().trigger ?? "@";
    const all = Array.isArray(value) ? value : [value];
    return all.filter((trigger): trigger is string => trigger.length > 0);
  }

  function closePopup() {
    state.open = false;
    state.matches = [];
  }

  function moveActive(delta: 1 | -1) {
    const enabled = state.matches
      .map((entry, index) => ({ entry, index }))
      .filter(({ entry }) => !entry.disabled);
    if (enabled.length === 0) return;
    const position = enabled.findIndex(({ index }) => index === state.active);
    const next = position === -1 ? 0 : (position + delta + enabled.length) % enabled.length;
    state.active = enabled[next]?.index ?? 0;
  }

  function detect() {
    const text = handlers.getText();
    const el = textarea();
    const caret = handlers.getCaret?.() ?? el?.selectionStart ?? text.length;
    caretIndex = caret;
    const head = text.slice(0, caret);
    const candidates = triggers()
      .map((trigger) => ({ trigger, anchor: head.lastIndexOf(trigger) }))
      .filter((candidate) => candidate.anchor !== -1)
      .sort((left, right) => right.anchor - left.anchor || right.trigger.length - left.trigger.length);
    const found = candidates[0];
    const token = found ? head.slice(found.anchor + found.trigger.length) : "";

    // A token ends at the first space: mentions name one subject.
    if (!found || /\s/.test(token)) {
      closePopup();
      return;
    }

    const query = token.toLowerCase();
    const roster = options().items.filter(
      (entry) =>
        entry.label.toLowerCase().startsWith(query) ||
        entry.value.toLowerCase().startsWith(query),
    );
    state.matches = roster;
    state.active = roster.findIndex((entry) => !entry.disabled);
    anchorIndex = found.anchor;
    activeTrigger = found.trigger;
    state.open = roster.length > 0;
  }

  async function insert(entry: MentionEntry) {
    if (entry.disabled || handlers.select?.(entry) === false) {
      closePopup();
      return;
    }

    const text = handlers.getText();
    const trigger = activeTrigger;
    const replacement = entry.insertText ?? trigger + entry.label;
    const suffix = entry.insertText == null ? " " : "";
    const next =
      text.slice(0, anchorIndex) + replacement + suffix + text.slice(caretIndex);
    handlers.setText(next);
    closePopup();
    // The field must hold the new text before the caret lands in it.
    await tick();
    const el = textarea();
    if (!el) return;
    const caret = anchorIndex + replacement.length + suffix.length;
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
      moveActive(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      moveActive(-1);
    } else if (event.key === "Enter" || event.key === " ") {
      const entry = state.matches[state.active];
      if (!entry || entry.disabled) return false;
      event.preventDefault();
      void insert(entry);
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
    get anchorIndex() {
      return anchorIndex;
    },
    get caretIndex() {
      return caretIndex;
    },
    get activeTrigger() {
      return activeTrigger;
    },
    insert,
    close: closePopup,
    onInput,
    onKeydown,
  };
}
</script>
