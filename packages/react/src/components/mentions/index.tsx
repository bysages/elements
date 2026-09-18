import { Popover as ArkPopover } from "@ark-ui/react/popover";
import { Portal } from "@ark-ui/react/portal";
import { injectComponentStyle } from "@bysages/core";
import { useRef, useState } from "react";
import type { ChangeEvent, HTMLAttributes } from "react";

import { Field } from "../field";
import { useMentions } from "./use-mentions";

export type { UseMentionsOptions, UseMentionsHandlers } from "./use-mentions";
export { useMentions } from "./use-mentions";

export interface MentionEntry {
  label: string;
  value: string;
}

export interface MentionsVesselProps {
  /** Whether the candidates are up. */
  open?: boolean;
  /** The candidates on offer. */
  matches?: MentionEntry[];
  /** The keyboard's active row. */
  active?: number;
  /** The rectangle the vessel points at — the host's textarea. */
  anchor?: HTMLTextAreaElement | null;
  /** A candidate was chosen. */
  onInsert?: (entry: MentionEntry) => void;
  /** The pointer moved to a row. */
  onActiveChange?: (index: number) => void;
  /** The vessel was dismissed. */
  onOpenChange?: (open: boolean) => void;
}

/** The vessel: the candidates themselves as a floating card. The anchor
 * is virtual — a live rectangle off the host's field — so a host keeps
 * its own anatomy (the textarea rides where the host puts it) and the
 * vessel still points at the right place. Shares the detection state
 * with the host through `useMentions`. */
export function MentionsVessel({
  open = false,
  matches = [],
  active = 0,
  anchor = null,
  onInsert,
  onActiveChange,
  onOpenChange,
}: MentionsVesselProps) {
  return (
    <ArkPopover.Root
      open={open}
      onOpenChange={(details) => onOpenChange?.(details.open)}
      positioning={{
        placement: "bottom-start",
        getAnchorRect: () => anchor?.getBoundingClientRect() ?? null,
      }}
    >
      <Portal>
        <ArkPopover.Positioner>
          <ArkPopover.Content asChild>
            <div data-scope="mentions" data-part="popup">
              {matches.map((entry, index) => (
                <div
                  key={entry.value}
                  data-scope="mentions"
                  data-part="option"
                  data-active={index === active ? "" : undefined}
                  onMouseEnter={() => onActiveChange?.(index)}
                  // The pointer confirms without moving the keyboard's
                  // active row out from under it.
                  onMouseDown={(event) => event.preventDefault()}
                  onClick={() => onInsert?.(entry)}
                >
                  {entry.label}
                </div>
              ))}
            </div>
          </ArkPopover.Content>
        </ArkPopover.Positioner>
      </Portal>
    </ArkPopover.Root>
  );
}

/**
 * @-mentions: a plain textarea that, when the text before the caret ends
 * with the trigger character followed by a token, offers the matching
 * candidates in a small anchored vessel; choosing one replaces the token
 * with `trigger + label` and hands the whole text back through
 * `onValueChange`. Arrows move, Enter inserts, Escape dismisses.
 *
 * The field is the shared `Field.Textarea` — field wiring (label ids,
 * the invalid state, autoresize) rides on it for free — and the vessel
 * anchors to the field as a whole (popover machinery), not to the caret
 * coordinates; caret-precise positioning would need a second
 * positioning system for no practical gain at typical field sizes.
 * Composers that keep their own field anatomy (the AI prompt input)
 * skip this shell and wire `useMentions` plus `MentionsVessel`
 * themselves.
 */
export interface MentionsProps extends HTMLAttributes<HTMLDivElement> {
  /** The candidates offered once the trigger character is typed. */
  items?: MentionEntry[];
  /** The text held by the field. Supply it to control the field;
   * changes are reported via `onValueChange`. */
  value?: string;
  /** The character that summons the candidates. */
  trigger?: string;
  placeholder?: string;
  /** Let the field grow with its text instead of holding `rows`. */
  autoresize?: boolean;
  /** Standing alone, the field styles itself from this flag; inside a
   * `Field.Root` the field's own invalid state takes over. */
  invalid?: boolean;
  /** Reports the field's next text. */
  onValueChange?: (value: string) => void;
}

export function Mentions({
  items = [],
  value,
  trigger = "@",
  placeholder,
  autoresize = false,
  invalid = false,
  onValueChange,
  children,
  ...rest
}: MentionsProps) {
  // Mirrors the controlled value when the caller does not pass one.
  const [internal, setInternal] = useState("");
  // The field part renders the textarea itself; its element rides the
  // ref. A ref turn does not re-render, but the anchor is only read
  // once the vessel is up — and opening the vessel re-renders.
  const fieldRef = useRef<HTMLTextAreaElement | null>(null);
  const el = () => fieldRef.current;

  const current = value ?? internal;

  const mentions = useMentions({ items, trigger }, el, {
    getText: () => el()?.value ?? current,
    setText: (next) => {
      setInternal(next);
      onValueChange?.(next);
    },
  });

  const handleChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const node = event.currentTarget;
    setInternal(node.value);
    onValueChange?.(node.value);
    mentions.onInput();
  };

  return (
    <div {...rest} data-scope="mentions" data-part="root">
      <Field.Textarea
        ref={fieldRef}
        autoresize={autoresize}
        rows={3}
        placeholder={placeholder}
        value={current}
        onChange={handleChange}
        onKeyDown={(event) => mentions.onKeydown(event)}
        data-invalid={invalid || undefined}
        data-scope="mentions"
        data-part="textarea"
      />
      <MentionsVessel
        open={mentions.open}
        matches={mentions.matches}
        active={mentions.active}
        anchor={el()}
        onInsert={mentions.insert}
        onActiveChange={mentions.setActive}
        onOpenChange={(open) => {
          if (!open) mentions.close();
        }}
      />
      {children}
    </div>
  );
}

injectComponentStyle("mentions");
