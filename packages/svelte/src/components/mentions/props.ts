import type { PopoverAnchorProps } from "@ark-ui/svelte/popover";
import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

export interface MentionEntry {
  /** Stable identity for tests, popups and business handlers. */
  id?: string;
  /** The primary words shown in the popup and inserted by default. */
  label: string;
  /** The semantic value reported by the field. */
  value: string;
  /** One line of supporting copy under the label. */
  description?: string;
  /** A curated core icon name. */
  icon?: string;
  /** Optional section heading; entries with the same heading travel together. */
  group?: string;
  /** The consumer's coarse entry type, such as `file`, `agent` or `command`. */
  kind?: string;
  /** A visible candidate the keyboard and pointer cannot choose. */
  disabled?: boolean;
  /** Exact composer text to insert; it bypasses `trigger + label`. */
  insertText?: string;
  /** Extra consumer data carried back through `onSelect`. */
  meta?: Record<string, unknown>;
}

export type MentionTriggers = string | string[];

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

export interface MentionsProps extends HTMLAttributes<HTMLDivElement> {
  /** The candidates offered once a trigger character is typed. */
  items?: MentionEntry[];
  /** Two-way bindable — `bind:value` keeps the bound variable mirroring
   * the field; changes are reported through `onValueChange`. */
  value?: string;
  /** The character that summons the candidates. */
  trigger?: string;
  /** One or more summoning characters, such as `@` and `/`. */
  triggers?: MentionTriggers;
  /** Keep composer text untouched when a candidate is selected. */
  insertOnSelect?: boolean;
  placeholder?: string;
  /** Let the field grow with its text instead of holding `rows`. */
  autoresize?: boolean;
  /** Standing alone, the field announces itself invalid; inside a
   * `Field.Root` the field's own invalid state takes over. */
  invalid?: boolean;
  /** One rung of the control-height ladder for the resting field. */
  size?: "sm" | "md" | "lg";
  /** The field's text turned. */
  onValueChange?: (value: string) => void;
  /** A candidate was confirmed; the whole entry rides back. */
  onSelect?: (entry: MentionEntry) => void;
}

export interface MentionsVesselProps {
  /** The vessel's stable id; its options derive their ids from it. */
  id?: string;
  open?: boolean;
  matches?: MentionEntry[];
  active?: number;
  /** The live rectangle the vessel points at — the host's field. */
  anchor?: HTMLTextAreaElement | null;
  /** The host field's rung, so the rows keep the field's register. */
  size?: "sm" | "md" | "lg";
  /** A candidate was confirmed (click or Enter). */
  onInsert?: (entry: MentionEntry) => void;
  /** The keyboard's active row moved. */
  onActiveChange?: (index: number) => void;
  /** The vessel's open state turned. */
  onOpenChange?: (open: boolean) => void;
  /** The host's field, rendered with the popover Anchor's wiring. When
   * absent, the vessel falls back to the `anchor` rectangle. */
  children?: Snippet<[() => PopoverAnchorProps]>;
}
