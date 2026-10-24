import { nextTick, ref } from "vue";

import type { MentionEntry } from "./index";

export interface UseMentionsOptions {
  /** The candidates offered once a trigger character is typed. */
  items: MentionEntry[];
  /** The character that summons the candidates. */
  trigger?: string;
  /** One or more summoning characters; the longest token closest to the
   * caret wins when several triggers are active. */
  triggers?: string | string[];
}

export interface UseMentionsHandlers {
  /** The text the field holds right now — read at keystroke time, never
   * from a controlled prop that lags a render behind the caret. */
  getText: () => string;
  /** Writes the field's next text: a mention inserted at the token. */
  setText: (value: string) => void;
  /** Called before insertion. Return `false` to record the choice without
   * rewriting composer text — useful for slash commands and context chips. */
  select?: (entry: MentionEntry) => boolean | void;
}

/** Candidate detection behind a mention field: watch the caret, offer the
 * matching candidates, and answer for the keys that drive them. The field
 * element arrives as a getter because hosts wrap it differently (a bare
 * textarea, a field component's `$el`).
 *
 * `onKeydown` answers whether the vessel consumed the key, so a host
 * with its own Enter semantics — a composer that sends — can yield to
 * the candidates first and act only when the vessel stands down. */
export function useMentions(
  options: () => UseMentionsOptions,
  textarea: () => HTMLTextAreaElement | null,
  handlers: UseMentionsHandlers,
) {
  const popupOpen = ref(false);
  const matches = ref<MentionEntry[]>([]);
  const active = ref(0);
  // Where the trigger character sits, and where the caret was — the
  // token between them is what a choice replaces.
  const anchorIndex = ref(0);
  const caretIndex = ref(0);
  // The trigger that opened the live token, kept through insertion so a
  // multi-trigger roster does not silently rewrite `/` as `@`.
  const activeTrigger = ref("@");

  const triggers = (): string[] => {
    const value = options().triggers ?? options().trigger ?? "@";
    const all = Array.isArray(value) ? value : [value];
    return all.filter((trigger): trigger is string => trigger.length > 0);
  };

  const closePopup = () => {
    popupOpen.value = false;
    matches.value = [];
  };

  const moveActive = (delta: 1 | -1) => {
    const enabled = matches.value
      .map((entry, index) => ({ entry, index }))
      .filter(({ entry }) => !entry.disabled);
    if (enabled.length === 0) return;
    const position = enabled.findIndex(({ index }) => index === active.value);
    const next = position === -1 ? 0 : (position + delta + enabled.length) % enabled.length;
    active.value = enabled[next]?.index ?? 0;
  };

  const detect = () => {
    const text = handlers.getText();
    const el = textarea();
    const caret = el?.selectionStart ?? text.length;
    caretIndex.value = caret;
    const head = text.slice(0, caret);
    const candidates = triggers()
      .map((trigger) => ({ trigger, anchor: head.lastIndexOf(trigger) }))
      .filter((candidate) => candidate.anchor !== -1)
      .sort(
        (left, right) => right.anchor - left.anchor || right.trigger.length - left.trigger.length,
      );
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
        entry.label.toLowerCase().startsWith(query) || entry.value.toLowerCase().startsWith(query),
    );
    matches.value = roster;
    active.value = roster.findIndex((entry) => !entry.disabled);
    anchorIndex.value = found.anchor;
    activeTrigger.value = found.trigger;
    popupOpen.value = roster.length > 0;
  };

  const insert = (entry: MentionEntry) => {
    if (entry.disabled || handlers.select?.(entry) === false) {
      closePopup();
      return;
    }

    const text = handlers.getText();
    const trigger = activeTrigger.value;
    const replacement = entry.insertText ?? trigger + entry.label;
    const suffix = entry.insertText == null ? " " : "";
    const next =
      text.slice(0, anchorIndex.value) + replacement + suffix + text.slice(caretIndex.value);
    handlers.setText(next);
    closePopup();
    void nextTick(() => {
      const el = textarea();
      if (!el) return;
      const caret = anchorIndex.value + replacement.length + suffix.length;
      el.focus();
      el.setSelectionRange(caret, caret);
    });
  };

  /** Feed the field's input events through here — the vessel watches
   * the text as it lands, from the element itself. */
  const onInput = () => detect();

  /** Arrows move, Enter inserts, Escape dismisses. Answers `true` when
   * the vessel consumed the key. */
  const onKeydown = (event: KeyboardEvent): boolean => {
    if (!popupOpen.value || matches.value.length === 0) return false;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveActive(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      moveActive(-1);
    } else if (event.key === "Enter" || event.key === " ") {
      const entry = matches.value[active.value];
      if (!entry || entry.disabled) return false;
      event.preventDefault();
      insert(entry);
    } else if (event.key === "Escape") {
      closePopup();
    } else {
      return false;
    }
    return true;
  };

  return { open: popupOpen, matches, active, insert, close: closePopup, onInput, onKeydown };
}
