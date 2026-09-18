export interface CommandEntry {
  label: string;
  value: string;
  /** Entries sharing a group are listed under one heading. */
  group?: string;
  /** A short affordance note, set as a keycap at the row's end. */
  hint?: string;
}

export interface CommandProps {
  /** The commands on offer, grouped as they arrive. */
  items?: CommandEntry[];
  placeholder?: string;
  /** Whether the palette is up. Bind it (`bind:open`) to control the
   * palette; changes are reported through `onOpenChange`. */
  open?: boolean;
  /** Whether the shell narrows `items` as the reader types. Turn it off
   * when the caller owns the searching — a ranked engine or a remote
   * source — and hands down the already-narrowed list. */
  autoFilter?: boolean;
  /** The field's text under the caller's control; changes are reported
   * through `onInputValueChange`. */
  inputValue?: string;
  /** What the list whispers when nothing matches. */
  emptyText?: string;
  /** Called with the chosen entry's `value`; the palette closes after. */
  onSelect?: (value: string) => void;
  /** The palette's open state turned. */
  onOpenChange?: (open: boolean) => void;
  /** The field's live text turned. */
  onInputValueChange?: (inputValue: string) => void;
}
