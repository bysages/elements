import type { HTMLAttributes } from "svelte/elements";

export interface MentionEntry {
  label: string;
  value: string;
}

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

export interface MentionsProps extends HTMLAttributes<HTMLDivElement> {
  /** The candidates offered once the trigger character is typed. */
  items?: MentionEntry[];
  /** Two-way bindable — `bind:value` keeps the bound variable mirroring
   * the field; changes are reported through `onValueChange`. */
  value?: string;
  /** The character that summons the candidates. */
  trigger?: string;
  placeholder?: string;
  /** Let the field grow with its text instead of holding `rows`. */
  autoresize?: boolean;
  /** Standing alone, the field announces itself invalid; inside a
   * `Field.Root` the field's own invalid state takes over. */
  invalid?: boolean;
  /** The field's text turned. */
  onValueChange?: (value: string) => void;
}

export interface MentionsVesselProps {
  open?: boolean;
  matches?: MentionEntry[];
  active?: number;
  /** The live rectangle the vessel points at — the host's field. */
  anchor?: HTMLTextAreaElement | null;
  /** A candidate was confirmed (click or Enter). */
  onInsert?: (entry: MentionEntry) => void;
  /** The keyboard's active row moved. */
  onActiveChange?: (index: number) => void;
  /** The vessel's open state turned. */
  onOpenChange?: (open: boolean) => void;
}
