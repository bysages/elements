import { nextTick, ref } from "vue";

import type { MentionEntry } from "./index";

export interface UseMentionsOptions {
  /** The candidates offered once the trigger character is typed. */
  items: MentionEntry[];
  /** The character that summons the candidates. */
  trigger?: string;
}

export interface UseMentionsHandlers {
  /** The text the field holds right now — read at keystroke time, never
   * from a controlled prop that lags a render behind the caret. */
  getText: () => string;
  /** Writes the field's next text: a mention inserted at the token. */
  setText: (value: string) => void;
}

/** The @-detection machinery behind a mention field: watch the caret,
 * offer the matching candidates, and answer for the keys that drive
 * them. The field element arrives as a getter because hosts wrap it
 * differently (a bare textarea, a field component's `$el`).
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

  const closePopup = () => {
    popupOpen.value = false;
    matches.value = [];
  };

  const detect = () => {
    const text = handlers.getText();
    const el = textarea();
    const caret = el?.selectionStart ?? text.length;
    caretIndex.value = caret;
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
    matches.value = found;
    active.value = 0;
    anchorIndex.value = anchor;
    popupOpen.value = found.length > 0;
  };

  const insert = (entry: MentionEntry) => {
    const text = handlers.getText();
    const char = options().trigger ?? "@";
    const next =
      text.slice(0, anchorIndex.value) + char + entry.label + " " + text.slice(caretIndex.value);
    handlers.setText(next);
    closePopup();
    void nextTick(() => {
      const el = textarea();
      if (!el) return;
      const caret = anchorIndex.value + char.length + entry.label.length + 1;
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
      active.value = (active.value + 1) % matches.value.length;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      active.value = (active.value - 1 + matches.value.length) % matches.value.length;
    } else if (event.key === "Enter") {
      // Enter is the insert answer while the vessel is up — never a
      // newline, and never the host's own action.
      event.preventDefault();
      insert(matches.value[active.value]);
    } else if (event.key === "Escape") {
      closePopup();
    } else {
      return false;
    }
    return true;
  };

  return { open: popupOpen, matches, active, insert, close: closePopup, onInput, onKeydown };
}
