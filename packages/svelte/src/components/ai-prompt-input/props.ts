import type { Snippet } from "svelte";
import type { HTMLAttributes } from "svelte/elements";

import type { MentionEntry } from "../mentions";

export interface PromptInputProps extends HTMLAttributes<HTMLFormElement> {
  /** The draft in the vessel — bind `value`; it clears itself on a
   * successful submit. */
  value?: string;
  onValueChange?: (value: string) => void;
  onSubmit?: (value: string) => void;
  onStop?: () => void;
  /** The quiet invitation before the reader types. */
  placeholder?: string;
  /** Still the words on the canvas, but the submit seal does nothing
   * and Enter stays a line break. */
  disabled?: boolean;
  /** The machine is working — the seal becomes a stop seal and Enter
   * holds its breath. */
  busy?: boolean;
  /** Mention candidates for the field: pass the roster and the summon
   * character (`@` unless told otherwise) and the vessel rides the
   * textarea. While candidates are up, Enter inserts and the send
   * waits. */
  mentions?: { items: MentionEntry[]; trigger?: string };
  /** Attachments riding above the text. */
  header?: Snippet;
  /** The tools at the text's left. */
  leading?: Snippet;
  /** Controls at the text's right — the send seal rides here by
   * default. */
  trailing?: Snippet;
  /** The tools beneath the text. */
  footer?: Snippet;
  /** The controls that close the footer row — the seal falls here by
   * default when a footer is present. */
  footerEnd?: Snippet;
}
