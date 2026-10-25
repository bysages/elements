import { useRef, useState } from "react";

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
  /** The absolute text offset of the field caret; a rich editor supplies this.
   * A textarea is read from its own selection when omitted. */
  getCaret?: () => number | undefined;
  /** Called before insertion. Return `false` to record the choice without
   * rewriting composer text — useful for slash commands and context chips. */
  select?: (entry: MentionEntry) => boolean | void;
}

/** Whatever carries a key press — a native KeyboardEvent or a React
 * synthetic one; the detector only needs the key's name and the power
 * to hold the key back. */
interface MentionKeyEvent {
  key: string;
  preventDefault: () => void;
}

/** The detection machinery behind a mention field: watch the caret,
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
  // The trigger that opened the live token, kept through insertion so a
  // multi-trigger roster does not silently rewrite `/` as `@`.
  const activeTrigger = useRef("@");

  const resolve = () => (typeof options === "function" ? options() : options);

  const triggers = () => {
    const value = resolve().triggers ?? resolve().trigger ?? "@";
    const all = Array.isArray(value) ? value : [value];
    return all.filter((trigger): trigger is string => trigger.length > 0);
  };

  const closePopup = () => {
    setPopupOpen(false);
    setMatches([]);
  };

  const moveActive = (delta: 1 | -1) => {
    const enabled = matches
      .map((entry, index) => ({ entry, index }))
      .filter(({ entry }) => !entry.disabled);
    if (enabled.length === 0) return;
    const position = enabled.findIndex(({ index }) => index === active);
    const next = position === -1 ? 0 : (position + delta + enabled.length) % enabled.length;
    setActive(enabled[next]?.index ?? 0);
  };

  const detect = () => {
    const text = handlers.getText();
    const el = textarea();
    const caret = handlers.getCaret?.() ?? el?.selectionStart ?? text.length;
    caretIndex.current = caret;
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
    const roster = resolve().items.filter(
      (entry) =>
        entry.label.toLowerCase().startsWith(query) || entry.value.toLowerCase().startsWith(query),
    );
    setMatches(roster);
    setActive(roster.findIndex((entry) => !entry.disabled));
    anchorIndex.current = found.anchor;
    activeTrigger.current = found.trigger;
    setPopupOpen(roster.length > 0);
  };

  const insert = (entry: MentionEntry) => {
    if (entry.disabled || handlers.select?.(entry) === false) {
      closePopup();
      return;
    }

    const text = handlers.getText();
    const trigger = activeTrigger.current;
    const replacement = entry.insertText ?? trigger + entry.label;
    const suffix = entry.insertText == null ? " " : "";
    const next =
      text.slice(0, anchorIndex.current) + replacement + suffix + text.slice(caretIndex.current);
    handlers.setText(next);
    closePopup();
    // Once the host's commit has landed the new text in the element,
    // put the caret where the inserted text ends.
    setTimeout(() => {
      const el = textarea();
      if (!el) return;
      const caret = anchorIndex.current + replacement.length + suffix.length;
      el.focus();
      el.setSelectionRange(caret, caret);
    }, 0);
  };

  /** Feed the field's input events through here — the vessel watches
   * the text as it lands, from the element itself. */
  const onInput = () => detect();

  /** Arrows move, Enter or Space inserts, Escape dismisses. Answers
   * `true` when the vessel consumed the key. */
  const onKeydown = (event: MentionKeyEvent): boolean => {
    if (!popupOpen || matches.length === 0) return false;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveActive(1);
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      moveActive(-1);
    } else if (event.key === "Enter" || event.key === " ") {
      const entry = matches[active];
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

  return {
    open: popupOpen,
    matches,
    active,
    setActive,
    anchorIndex,
    caretIndex,
    activeTrigger,
    insert,
    close: closePopup,
    onInput,
    onKeydown,
  };
}
