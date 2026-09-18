import { createSignal } from "solid-js";
import type { Accessor } from "solid-js";

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
 * them. The field element arrives as an accessor because hosts wrap it
 * differently (a bare textarea, a field's own part).
 *
 * `onKeydown` answers whether the vessel consumed the key, so a host
 * with its own Enter semantics — a composer that sends — can yield to
 * the candidates first and act only when the vessel stands down. */
export function useMentions(
  options: Accessor<UseMentionsOptions>,
  textarea: Accessor<HTMLTextAreaElement | null>,
  handlers: UseMentionsHandlers,
) {
  const [popupOpen, setPopupOpen] = createSignal(false);
  const [matches, setMatches] = createSignal<MentionEntry[]>([]);
  const [active, setActive] = createSignal(0);
  // Where the trigger character sits, and where the caret was — the
  // token between them is what a choice replaces.
  const [anchorIndex, setAnchorIndex] = createSignal(0);
  const [caretIndex, setCaretIndex] = createSignal(0);

  const closePopup = () => {
    setPopupOpen(false);
    setMatches([]);
  };

  const detect = () => {
    const text = handlers.getText();
    const el = textarea();
    const caret = el?.selectionStart ?? text.length;
    setCaretIndex(caret);
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
    setMatches(found);
    setActive(0);
    setAnchorIndex(anchor);
    setPopupOpen(found.length > 0);
  };

  const insert = (entry: MentionEntry) => {
    const text = handlers.getText();
    const char = options().trigger ?? "@";
    const next = text.slice(0, anchorIndex()) + char + entry.label + " " + text.slice(caretIndex());
    handlers.setText(next);
    closePopup();
    queueMicrotask(() => {
      const el = textarea();
      if (!el) return;
      const caret = anchorIndex() + char.length + entry.label.length + 1;
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
    if (!popupOpen() || matches().length === 0) return false;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((active() + 1) % matches().length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((active() - 1 + matches().length) % matches().length);
    } else if (event.key === "Enter") {
      // Enter is the insert answer while the vessel is up — never a
      // newline, and never the host's own action.
      event.preventDefault();
      insert(matches()[active()]);
    } else if (event.key === "Escape") {
      closePopup();
    } else {
      return false;
    }
    return true;
  };

  return {
    open: popupOpen,
    matches,
    active,
    setActive,
    insert,
    close: closePopup,
    onInput,
    onKeydown,
  };
}
