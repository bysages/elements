import { Popover as ArkPopover } from "@ark-ui/react/popover";
import { Portal } from "@ark-ui/react/portal";
import { injectComponentStyle } from "@bysages/core/styling";
import type { ChangeEvent, HTMLAttributes } from "react";
import { Fragment, useRef, useState } from "react";

import { withSelfRoot } from "../../internal/family";
import { useElementId } from "../../internal/id";
import { Field } from "../field";
import { Icon } from "../icon";
import { Popover } from "../popover";
import type { MentionCommitKey } from "./use-mentions";
import { useMentions } from "./use-mentions";

export type { MentionCommitKey, UseMentionsHandlers, UseMentionsOptions } from "./use-mentions";
export { useMentions } from "./use-mentions";

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

export type MentionPlacement = "bottom-start" | "top-start";

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
  anchor?: HTMLElement | null;
  /** Which side of the anchor hosts the candidates. */
  placement?: MentionPlacement;
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
  const id = useElementId("mentions-popup", rest);
  const groups: Array<{
    name: string;
    entries: Array<{ entry: MentionEntry; index: number }>;
  }> = [];
  const byName = new Map<
    string,
    { name: string; entries: Array<{ entry: MentionEntry; index: number }> }
  >();

  matches.forEach((entry, index) => {
    const name = entry.group ?? "";
    const group = byName.get(name);
    if (group) group.entries.push({ entry, index });
    else {
      const next = { name, entries: [{ entry, index }] };
      byName.set(name, next);
      groups.push(next);
    }
  });

  const optionId = (index: number) => `${id}:option-${index}`;
  const activeEntry = matches[active];

  return (
    <div
      {...rest}
      id={id}
      data-scope="mentions"
      data-part="popup"
      data-size={size}
      role="listbox"
      aria-activedescendant={activeEntry && !activeEntry.disabled ? optionId(active) : undefined}
    >
      {groups.map((group, groupIndex) => {
        const labelId = group.name ? `${id}:group-${groupIndex}` : undefined;
        const options = group.entries.map(({ entry, index }) => (
          <div
            key={`${entry.id ?? entry.value}:${index}`}
            id={optionId(index)}
            role="option"
            aria-selected={index === active && !entry.disabled}
            aria-disabled={entry.disabled ? "true" : undefined}
            tabIndex={-1}
            data-scope="mentions"
            data-part="option"
            data-active={index === active && !entry.disabled ? "" : undefined}
            data-disabled={entry.disabled ? "" : undefined}
            onMouseEnter={() => {
              if (!entry.disabled) onActiveChange?.(index);
            }}
            // Confirm on press, before the floating vessel can tear
            // down; focus stays on the field.
            onMouseDown={(event) => {
              if (event.button !== 0) return;
              event.preventDefault();
              if (!entry.disabled) onInsert?.(entry);
            }}
            onKeyDown={(event) => {
              if (event.key !== "Enter" && event.key !== " ") return;
              event.preventDefault();
              if (!entry.disabled) onInsert?.(entry);
            }}
          >
            {entry.icon ? <Icon name={entry.icon} /> : null}
            <span data-scope="mentions" data-part="option-main">
              <span data-scope="mentions" data-part="option-label">
                {entry.label}
              </span>
              {entry.description ? (
                <span data-scope="mentions" data-part="option-description">
                  {entry.description}
                </span>
              ) : null}
            </span>
            {entry.kind ? (
              <span data-scope="mentions" data-part="option-kind">
                {entry.kind}
              </span>
            ) : null}
          </div>
        ));

        if (!group.name) return <Fragment key="ungrouped">{options}</Fragment>;
        return (
          <div
            key={`group:${group.name}`}
            role="group"
            aria-labelledby={labelId}
            data-scope="mentions"
            data-part="group"
          >
            <div id={labelId} data-scope="mentions" data-part="group-label">
              {group.name}
            </div>
            {options}
          </div>
        );
      })}
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
  placement = "bottom-start",
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
      ids={{ content: `${hostId}:popup` }}
      open={open}
      onOpenChange={(details) => onOpenChange?.(details.open)}
      positioning={{
        placement,
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
              id={`${hostId}:popup`}
            />
          </ArkPopover.Content>
        </ArkPopover.Positioner>
      </Portal>
    </ArkPopover.Root>
  );
}

export const MentionsVessel = withSelfRoot(MentionsVesselImpl);

/**
 * Mentions: a textarea that, when the text before the caret ends with a
 * trigger character followed by a token, offers matching candidates in a
 * small anchored vessel. Entries may carry descriptions, icons, groups
 * and consumer metadata. Selecting reports the whole entry; by default it
 * also replaces the token with `trigger + label`.
 *
 * The field is the shared `Field.Textarea` — field wiring (label ids,
 * the invalid state, autoresize) rides on it for free — and the vessel
 * anchors through the popover's own `Anchor` part wrapped around the
 * field, so the machine, not a local rectangle, points the popup at the
 * input. Composers that keep their own field anatomy (the AI prompt
 * input) skip this shell and wire `useMentions` plus `MentionsVessel`
 * themselves.
 */
export interface MentionsProps extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect"> {
  /** The candidates offered once a trigger character is typed. */
  items?: MentionEntry[];
  /** The text held by the field. Supply it to control the field;
   * changes are reported via `onValueChange`. */
  value?: string;
  /** The character that summons the candidates. */
  trigger?: string;
  /** One or more summoning characters, such as `@` and `/`. */
  triggers?: MentionTriggers;
  /** Keep composer text untouched when a candidate is selected. */
  insertOnSelect?: boolean;
  /** Keys that choose the highlighted candidate. */
  commitKeys?: MentionCommitKey[];
  /** Which side of the field hosts the candidates. */
  placement?: MentionPlacement;
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
  /** Reports the whole selected entry. */
  onSelect?: (entry: MentionEntry) => void;
}

function MentionsImpl({
  items = [],
  value,
  trigger = "@",
  triggers,
  insertOnSelect = true,
  commitKeys,
  placement = "bottom-start",
  placeholder,
  autoresize = false,
  invalid = false,
  size = "md",
  onValueChange,
  onSelect,
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

  const mentions = useMentions(() => ({ items, trigger, triggers, commitKeys }), el, {
    getText: () => el()?.value ?? current,
    setText: (next) => {
      setInternal(next);
      onValueChange?.(next);
    },
    select: (entry) => {
      onSelect?.(entry);
      return insertOnSelect;
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
        ids={{ content: `${hostId}:vessel:popup` }}
        open={mentions.open}
        onOpenChange={(details) => {
          if (!details.open) mentions.close();
        }}
        positioning={{ placement }}
      >
        <ArkPopover.Anchor asChild>
          <Field.Textarea
            ref={fieldRef}
            autoresize={autoresize}
            rows={3}
            placeholder={placeholder}
            value={current}
            aria-expanded={mentions.open}
            aria-controls={mentions.open ? `${hostId}:vessel:popup` : undefined}
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
              id={`${hostId}:vessel:popup`}
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
