import { Popover as ArkPopover } from "@ark-ui/react/popover";
import { Portal } from "@ark-ui/react/portal";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ChangeEvent, HTMLAttributes } from "react";
import { useRef, useState } from "react";

import { withSelfRoot } from "../../internal/family";
import { useElementId } from "../../internal/id";
import { Field } from "../field";
import { Popover } from "../popover";
import { useMentions } from "./use-mentions";

export type { UseMentionsHandlers, UseMentionsOptions } from "./use-mentions";
export { useMentions } from "./use-mentions";

export interface MentionEntry {
  label: string;
  value: string;
}

export interface MentionsVesselProps {
  id?: string;
  /** The host field's rung, so the rows keep the field's register. */
  size?: "sm" | "md" | "lg";
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

/** The candidates themselves as a floating card. Rendered inside the
 * popover's Content via `asChild`, so the machine's content wiring
 * lands on this card; `rest` stays first so the machine can layer
 * state on top without covering the anatomy names. */
interface MentionsPopupProps extends HTMLAttributes<HTMLDivElement> {
  size: "sm" | "md" | "lg";
  matches: MentionEntry[];
  active: number;
  onInsert?: (entry: MentionEntry) => void;
  onActiveChange?: (index: number) => void;
}

function MentionsPopup({
  size,
  matches,
  active,
  onInsert,
  onActiveChange,
  ...rest
}: MentionsPopupProps) {
  return (
    <div {...rest} data-scope="mentions" data-part="popup" data-size={size} role="listbox">
      {matches.map((entry, index) => (
        <div
          key={entry.value}
          role="option"
          aria-selected={index === active}
          tabIndex={-1}
          data-scope="mentions"
          data-part="option"
          data-active={index === active ? "" : undefined}
          onMouseEnter={() => onActiveChange?.(index)}
          // The pointer confirms without moving the keyboard's
          // active row out from under it.
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => onInsert?.(entry)}
          onKeyDown={(event) => {
            if (event.key !== "Enter" && event.key !== " ") return;
            event.preventDefault();
            onInsert?.(entry);
          }}
        >
          {entry.label}
        </div>
      ))}
    </div>
  );
}

/** The vessel: the candidates themselves as a floating card. The anchor
 * is virtual — a live rectangle off the host's field — so a host keeps
 * its own anatomy (the textarea rides where the host puts it) and the
 * vessel still points at the right place. Shares the detection state
 * with the host through `useMentions`. */
function MentionsVesselImpl({
  size = "md",
  open = false,
  matches = [],
  active = 0,
  anchor = null,
  onInsert,
  onActiveChange,
  onOpenChange,
  id,
}: MentionsVesselProps) {
  injectComponentStyle("mentions");
  const hostId = useElementId("mentions", { id });
  return (
    <ArkPopover.Root
      id={`${hostId}:vessel`}
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
            <MentionsPopup
              size={size}
              matches={matches}
              active={active}
              onInsert={onInsert}
              onActiveChange={onActiveChange}
            />
          </ArkPopover.Content>
        </ArkPopover.Positioner>
      </Portal>
    </ArkPopover.Root>
  );
}

export const MentionsVessel = withSelfRoot(MentionsVesselImpl);

/**
 * @-mentions: a plain textarea that, when the text before the caret ends
 * with the trigger character followed by a token, offers the matching
 * candidates in a small anchored vessel; choosing one replaces the token
 * with `trigger + label` and hands the whole text back through
 * `onValueChange`. Arrows move, Enter inserts, Escape dismisses.
 *
 * The field is the shared `Field.Textarea` — field wiring (label ids,
 * the invalid state, autoresize) rides on it for free — and the vessel
 * anchors through the popover's own `Anchor` part wrapped around the
 * field, so the machine, not a local rectangle, points the popup at the
 * input. Composers that keep their own field anatomy (the AI prompt
 * input) skip this shell and wire `useMentions` plus `MentionsVessel`
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
  /** One rung of the control-height ladder for the resting field. */
  size?: "sm" | "md" | "lg";
  /** Reports the field's next text. */
  onValueChange?: (value: string) => void;
}

function MentionsImpl({
  items = [],
  value,
  trigger = "@",
  placeholder,
  autoresize = false,
  invalid = false,
  size = "md",
  onValueChange,
  children,
  ...rest
}: MentionsProps) {
  const hostId = useElementId("mentions", rest);
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
    <div {...rest} data-scope="mentions" data-part="root" data-size={size}>
      <ArkPopover.Root
        id={`${hostId}:vessel`}
        open={mentions.open}
        onOpenChange={(details) => {
          if (!details.open) mentions.close();
        }}
        positioning={{ placement: "bottom-start" }}
      >
        <ArkPopover.Anchor asChild>
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
        </ArkPopover.Anchor>
        <ArkPopover.Positioner>
          <ArkPopover.Content asChild>
            <MentionsPopup
              size={size}
              matches={mentions.matches}
              active={mentions.active}
              onInsert={mentions.insert}
              onActiveChange={mentions.setActive}
            />
          </ArkPopover.Content>
        </ArkPopover.Positioner>
      </ArkPopover.Root>
      {children}
    </div>
  );
}

export const Mentions = Object.assign(MentionsImpl, Popover) as typeof MentionsImpl &
  typeof Popover;
