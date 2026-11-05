import { Field as ArkField } from "@ark-ui/solid/field";
import { Popover as ArkPopover } from "@ark-ui/solid/popover";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, Show, createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js";

import { defineFamily, withSelfRoot } from "../../internal/family";
import type { FloatingPortalTarget } from "../../internal/floating";
import { useElementId } from "../../internal/id";
import { Icon } from "../icon";
import { Popover } from "../popover";
import { useMentions, type MentionCommitKey, type MentionTriggers } from "./use-mentions";

/** The Anchor's polymorphic wiring is div-typed at the API boundary; the
 * textarea host supplies the concrete element type. */
type MentionsAnchorProps = JSX.HTMLAttributes<HTMLTextAreaElement>;

export type {
  MentionCommitKey,
  MentionTriggers,
  UseMentionsHandlers,
  UseMentionsOptions,
} from "./use-mentions";
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

export type MentionPlacement = "bottom-start" | "top-start";

interface GroupedMentions {
  name: string;
  entries: Array<{ entry: MentionEntry; index: number }>;
}

function groupMentions(matches: MentionEntry[]): GroupedMentions[] {
  const ordered: GroupedMentions[] = [];
  const byName = new Map<string, GroupedMentions>();

  matches.forEach((entry, index) => {
    const name = entry.group ?? "";
    const group = byName.get(name);
    if (group) group.entries.push({ entry, index });
    else {
      const next = { name, entries: [{ entry, index }] };
      byName.set(name, next);
      ordered.push(next);
    }
  });
  return ordered;
}

export interface MentionsVesselProps {
  open?: boolean;
  matches?: MentionEntry[];
  active?: number;
  /** The live element the vessel points at — the anchor is virtual, a
   * rectangle read off the host's field. */
  anchor?: HTMLElement | null;
  /** Which side of the anchor hosts the candidates. */
  placement?: MentionPlacement;
  /** The host field's rung, so the rows keep the field's register. */
  size?: "sm" | "md" | "lg";
  /** The vessel's stable base id; popup ids derive from it. */
  id?: string;
  /** Portal after hydration; `false` keeps the vessel inline. */
  portal?: FloatingPortalTarget;
  onInsert?: (entry: MentionEntry) => void;
  onActiveChange?: (index: number) => void;
  onOpenChange?: (open: boolean) => void;
  /** The host's field, rendered with the popover Anchor's wiring. When
   * absent, the vessel falls back to the `anchor` rectangle. */
  children?: JSX.Element | ((anchorProps: MentionsAnchorProps) => JSX.Element);
}

/** The vessel: the candidates themselves as a floating card. A host can
 * render its field through the Anchor; the rectangle fallback keeps the
 * textarea in the host's own anatomy. Shares the detection state with
 * the host through `useMentions`. */
export const MentionsVessel = withSelfRoot(function MentionsVessel(props: MentionsVesselProps) {
  injectComponentStyle("mentions");
  const id = useElementId("mentions-vessel", () => props.id);
  const popupId = () => `${id()}:popup`;

  const option = (entry: MentionEntry, index: () => number) => {
    const active = () => index() === (props.active ?? 0) && !entry.disabled;
    return (
      <div
        id={`${popupId()}:option-${index()}`}
        role="option"
        aria-selected={active()}
        aria-disabled={entry.disabled ? "true" : undefined}
        tabindex={-1}
        data-scope="mentions"
        data-part="option"
        data-active={active() ? "" : undefined}
        data-disabled={entry.disabled ? "" : undefined}
        onMouseEnter={() => {
          if (!entry.disabled) props.onActiveChange?.(index());
        }}
        // Confirm on press, before the floating vessel can tear down;
        // focus stays on the field.
        onMouseDown={(event: MouseEvent) => {
          if (event.button !== 0) return;
          event.preventDefault();
          if (!entry.disabled) props.onInsert?.(entry);
        }}
        onKeyDown={(event: KeyboardEvent) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          if (!entry.disabled) props.onInsert?.(entry);
        }}
      >
        <Show when={entry.icon}>
          <Icon name={entry.icon!} />
        </Show>
        <span data-scope="mentions" data-part="option-main">
          <span data-scope="mentions" data-part="option-label">
            {entry.label}
          </span>
          <Show when={entry.description}>
            <span data-scope="mentions" data-part="option-description">
              {entry.description}
            </span>
          </Show>
        </span>
        <Show when={entry.kind}>
          <span data-scope="mentions" data-part="option-kind">
            {entry.kind}
          </span>
        </Show>
      </div>
    );
  };

  return (
    <ArkPopover.Root
      id={`${id()}:vessel`}
      ids={{ content: popupId() }}
      open={props.open ?? false}
      onOpenChange={(details) => props.onOpenChange?.(details.open)}
      positioning={
        props.children
          ? { placement: props.placement ?? "bottom-start" }
          : {
              placement: props.placement ?? "bottom-start",
              getAnchorRect: () => props.anchor?.getBoundingClientRect() ?? null,
            }
      }
    >
      {props.children ? (
        <ArkPopover.Anchor
          asChild={(anchorProps) =>
            typeof props.children === "function"
              ? props.children(anchorProps() as MentionsAnchorProps)
              : props.children
          }
        />
      ) : null}
      <Popover.Positioner portal={props.portal ?? false}>
        <ArkPopover.Content
          asChild={(contentProps) => (
            <div
              {...contentProps()}
              id={popupId()}
              role="listbox"
              aria-activedescendant={
                props.matches?.[props.active ?? 0] && !props.matches?.[props.active ?? 0]?.disabled
                  ? `${popupId()}:option-${props.active ?? 0}`
                  : undefined
              }
              data-scope="mentions"
              data-part="popup"
              data-size={props.size ?? "md"}
            >
              <For each={groupMentions(props.matches ?? [])}>
                {(group, groupIndex) => {
                  const labelId = group.name ? `${popupId()}:group-${groupIndex()}` : undefined;
                  const options = (
                    <For each={group.entries}>
                      {({ entry, index }) => option(entry, () => index)}
                    </For>
                  );

                  if (!group.name) return options;
                  return (
                    <div
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
                }}
              </For>
            </div>
          )}
        />
      </Popover.Positioner>
    </ArkPopover.Root>
  );
});

export interface MentionsProps extends Omit<
  JSX.HTMLAttributes<HTMLDivElement>,
  "onInput" | "onSelect"
> {
  /** The candidates offered once the trigger character is typed. */
  items?: MentionEntry[];
  /** The text held by the field. Supply it to control the field;
   * changes are reported through `onValueChange`. */
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
  /** Portal after hydration; `false` keeps the vessel inline. */
  portal?: FloatingPortalTarget;
  /** The field's text changed. */
  onValueChange?: (value: string) => void;
  /** A candidate was chosen, including when `insertOnSelect` keeps the
   * composer text untouched. */
  onSelect?: (entry: MentionEntry) => void;
}

/**
 * @-mentions: a plain textarea that, when the text before the caret ends
 * with a trigger character followed by a token, offers matching
 * candidates in a small anchored vessel. Entries may carry descriptions,
 * icons, groups and consumer metadata. Selecting reports the whole
 * entry; by default it also replaces the token with the trigger that
 * opened it plus the label. Arrows move, Enter inserts, Escape dismisses.
 *
 * The field is the shared `Field.Textarea` — field wiring (label ids,
 * the invalid state, autoresize) rides on it for free — and the vessel
 * anchors to the field as a whole (popover machinery), not to the caret
 * coordinates; caret-precise positioning would need a second positioning
 * system for no practical gain at typical field sizes. Composers that
 * keep their own field anatomy (the AI prompt input) skip this shell and
 * wire `useMentions` plus `MentionsVessel` themselves.
 */
function MentionsImpl(props: MentionsProps) {
  const [own, rest] = splitProps(props, [
    "items",
    "value",
    "trigger",
    "triggers",
    "insertOnSelect",
    "commitKeys",
    "placement",
    "placeholder",
    "autoresize",
    "invalid",
    "size",
    "portal",
    "onValueChange",
    "onSelect",
  ]);
  // Mirrors the controlled value when the caller does not pass one.
  const [internal, setInternal] = createSignal("");
  const [fieldEl, setFieldEl] = createSignal<HTMLTextAreaElement | null>(null);
  const hostId = useElementId("mentions", () => rest.id);
  const popupId = () => `${hostId()}:vessel:popup`;

  const value = () => own.value ?? internal();

  const mentions = useMentions(
    () => ({
      items: own.items ?? [],
      trigger: own.trigger,
      triggers: own.triggers,
      commitKeys: own.commitKeys,
    }),
    fieldEl,
    {
      getText: () => fieldEl()?.value ?? value(),
      setText: (next) => {
        setInternal(next);
        own.onValueChange?.(next);
      },
      select: (entry) => {
        own.onSelect?.(entry);
        return own.insertOnSelect !== false;
      },
    },
  );

  const onInput = () => {
    const node = fieldEl();
    if (!node) return;
    setInternal(node.value);
    own.onValueChange?.(node.value);
    mentions.onInput();
  };

  const field = (anchorProps: MentionsAnchorProps) => (
    <ArkField.Textarea
      {...anchorProps}
      ref={(node) => setFieldEl(node)}
      autoresize={own.autoresize ?? false}
      aria-invalid={own.invalid ? "true" : undefined}
      aria-expanded={mentions.open()}
      aria-controls={mentions.open() ? popupId() : undefined}
      rows={3}
      placeholder={own.placeholder}
      value={value()}
      onInput={onInput}
      onKeyDown={(event: KeyboardEvent) => {
        mentions.onKeydown(event);
      }}
      data-scope="mentions"
      data-part="textarea"
    />
  );

  return (
    <div
      {...rest}
      id={hostId()}
      data-scope="mentions"
      data-part="root"
      data-size={own.size ?? "md"}
    >
      <MentionsVessel
        open={mentions.open()}
        matches={mentions.matches()}
        active={mentions.active()}
        size={own.size ?? "md"}
        id={`${hostId()}:vessel`}
        placement={own.placement ?? "bottom-start"}
        portal={own.portal ?? false}
        onInsert={mentions.insert}
        onActiveChange={mentions.setActive}
        onOpenChange={(open) => {
          if (!open) mentions.close();
        }}
        children={field}
      ></MentionsVessel>
    </div>
  );
}

export const Mentions = defineFamily(MentionsImpl, Popover) as typeof MentionsImpl & typeof Popover;
