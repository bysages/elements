import { useRef, useState } from "react";

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

/** Whatever carries a key press — a native KeyboardEvent or a React
 * synthetic one; the detector only needs the key's name and the power
 * to hold the key back. */
interface MentionKeyEvent {
  key: string;
  preventDefault: () => void;
}

/** The @-detection machinery behind a mention field: watch the caret,
 * offer the matching candidates, and answer for the keys that drive
 * them. The field element arrives as a getter because hosts wrap it
 * differently (a bare textarea, a field part's ref).
 *
 * `onKeydown` answers whether the vessel consumed the key, so a host
 * with its own Enter semantics — a composer that sends — can yield to
 * the candidates first and act only when the vessel stands down. */
export function useMentions(
  options: UseMentionsOptions | (() => UseMentionsOptions),
  textarea: () => HTMLTextAreaElement | null,
  handlers: UseMentionsHandlers,
) {
  const [popupOpen, setPopupOpen] = useState(false);
  const [matches, setMatches] = useState<MentionEntry[]>([]);
  const [active, setActive] = useState(0);
  // Where the trigger character sits, and where the caret was — the
  // token between them is what a choice replaces.
  const anchorIndex = useRef(0);
  const caretIndex = useRef(0);

  const resolve = () => (typeof options === "function" ? options() : options);

  const closePopup = () => {
    setPopupOpen(false);
    setMatches([]);
  };

  const detect = () => {
    const text = handlers.getText();
    const el = textarea();
    const caret = el?.selectionStart ?? text.length;
    caretIndex.current = caret;
    const head = text.slice(0, caret);
    const char = resolve().trigger ?? "@";
    const anchor = head.lastIndexOf(char);
    const token = anchor === -1 ? "" : head.slice(anchor + char.length);
    // A token ends at the first space: mentions name one subject.
    if (anchor === -1 || /\s/.test(token)) {
      closePopup();
      return;
    }
    const found = resolve().items.filter((entry) =>
      entry.label.toLowerCase().startsWith(token.toLowerCase()),
    );
    setMatches(found);
    setActive(0);
    anchorIndex.current = anchor;
    setPopupOpen(found.length > 0);
  };

  const insert = (entry: MentionEntry) => {
    const text = handlers.getText();
    const char = resolve().trigger ?? "@";
    const next =
      text.slice(0, anchorIndex.current) +
      char +
      entry.label +
      " " +
      text.slice(caretIndex.current);
    handlers.setText(next);
    closePopup();
    // Once the host's commit has landed the new text in the element,
    // put the caret where the mention ends.
    setTimeout(() => {
      const el = textarea();
      if (!el) return;
      const caret = anchorIndex.current + char.length + entry.label.length + 1;
      el.focus();
      el.setSelectionRange(caret, caret);
    }, 0);
  };

  /** Feed the field's input events through here — the vessel watches
   * the text as it lands, from the element itself. */
  const onInput = () => detect();

  /** Arrows move, Enter inserts, Escape dismisses. Answers `true` when
   * the vessel consumed the key. */
  const onKeydown = (event: MentionKeyEvent): boolean => {
    if (!popupOpen || matches.length === 0) return false;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((current) => (current + 1) % matches.length);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((current) => (current - 1 + matches.length) % matches.length);
    } else if (event.key === "Enter") {
      // Enter is the insert answer while the vessel is up — never a
      // newline, and never the host's own action.
      event.preventDefault();
      insert(matches[active]);
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
