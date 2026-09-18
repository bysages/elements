import { Popover as ArkPopover } from "@ark-ui/solid/popover";
import { injectComponentStyle } from "@bysages/core";
import { For, createEffect, createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js";
import { Portal } from "solid-js/web";

import { Textarea } from "../textarea";
import { useMentions } from "./use-mentions";

export type { UseMentionsHandlers, UseMentionsOptions } from "./use-mentions";
export { useMentions } from "./use-mentions";

export interface MentionEntry {
  label: string;
  value: string;
}

export interface MentionsVesselProps {
  open?: boolean;
  matches?: MentionEntry[];
  active?: number;
  /** The live element the vessel points at — the anchor is virtual, a
   * rectangle read off the host's field. */
  anchor?: HTMLTextAreaElement | null;
  onInsert?: (entry: MentionEntry) => void;
  onActiveChange?: (index: number) => void;
  onOpenChange?: (open: boolean) => void;
}

/** The vessel: the candidates themselves as a floating card. The anchor
 * is virtual — a live rectangle off the host's field — so a host keeps
 * its own anatomy (the textarea rides where the host puts it) and the
 * vessel still points at the right place. Shares the detection state
 * with the host through `useMentions`. */
export function MentionsVessel(props: MentionsVesselProps) {
  return (
    <ArkPopover.Root
      open={props.open ?? false}
      onOpenChange={(details) => props.onOpenChange?.(details.open)}
      positioning={{
        placement: "bottom-start",
        getAnchorRect: () => props.anchor?.getBoundingClientRect() ?? null,
      }}
    >
      <Portal>
        <ArkPopover.Positioner>
          <ArkPopover.Content
            asChild={(contentProps) => (
              <div {...contentProps()} data-scope="mentions" data-part="popup">
                <For each={props.matches ?? []}>
                  {(entry, index) => (
                    <div
                      data-scope="mentions"
                      data-part="option"
                      data-active={index() === (props.active ?? 0) ? "" : undefined}
                      onMouseEnter={() => props.onActiveChange?.(index())}
                      // The pointer confirms without moving the
                      // keyboard's active row out from under it.
                      onMouseDown={(event: MouseEvent) => event.preventDefault()}
                      onClick={() => props.onInsert?.(entry)}
                    >
                      {entry.label}
                    </div>
                  )}
                </For>
              </div>
            )}
          />
        </ArkPopover.Positioner>
      </Portal>
    </ArkPopover.Root>
  );
}

export interface MentionsProps extends Omit<JSX.HTMLAttributes<HTMLDivElement>, "onInput"> {
  /** The candidates offered once the trigger character is typed. */
  items?: MentionEntry[];
  /** The text held by the field. Supply it to control the field;
   * changes are reported through `onValueChange`. */
  value?: string;
  /** The character that summons the candidates. */
  trigger?: string;
  placeholder?: string;
  /** Let the field grow with its text instead of holding `rows`. */
  autoresize?: boolean;
  /** Standing alone, the field styles itself from this flag; inside a
   * `Field.Root` the field's own invalid state takes over. */
  invalid?: boolean;
  /** The field's text changed. */
  onValueChange?: (value: string) => void;
}

/**
 * @-mentions: a plain textarea that, when the text before the caret ends
 * with the trigger character followed by a token, offers the matching
 * candidates in a small anchored vessel; choosing one replaces the token
 * with `trigger + label` and hands the whole text back through
 * `onValueChange`. Arrows move, Enter inserts, Escape dismisses.
 *
 * The field is the shared `Textarea` — field wiring (label ids, the
 * invalid state) rides on it for free — and the vessel anchors to the
 * field as a whole (popover machinery), not to the caret coordinates;
 * caret-precise positioning would need a second positioning system for
 * no practical gain at typical field sizes. Composers that keep their
 * own field anatomy (the AI prompt input) skip this shell and wire
 * `useMentions` plus `MentionsVessel` themselves.
 */
export function Mentions(props: MentionsProps) {
  const [own, rest] = splitProps(props, [
    "items",
    "value",
    "trigger",
    "placeholder",
    "autoresize",
    "invalid",
    "onValueChange",
  ]);
  // Mirrors the controlled value when the caller does not pass one.
  const [internal, setInternal] = createSignal("");
  const [fieldEl, setFieldEl] = createSignal<HTMLTextAreaElement | null>(null);

  const value = () => own.value ?? internal();

  const mentions = useMentions(() => ({ items: own.items ?? [], trigger: own.trigger }), fieldEl, {
    getText: () => fieldEl()?.value ?? value(),
    setText: (next) => {
      setInternal(next);
      own.onValueChange?.(next);
    },
  });

  // The field grows with its text — the vue field's `autoresize` prop
  // has no solid counterpart, so the growth rides this small effect.
  createEffect(() => {
    value();
    const node = fieldEl();
    if (!node || !(own.autoresize ?? false)) return;
    node.style.height = "auto";
    node.style.height = `${node.scrollHeight}px`;
  });

  const onInput = () => {
    const node = fieldEl();
    if (!node) return;
    setInternal(node.value);
    own.onValueChange?.(node.value);
    mentions.onInput();
  };

  return (
    <div {...rest} data-scope="mentions" data-part="root">
      <Textarea
        ref={(node) => setFieldEl(node)}
        invalid={own.invalid}
        rows={3}
        placeholder={own.placeholder}
        value={value()}
        onValueChange={(next) => {
          setInternal(next);
          own.onValueChange?.(next);
        }}
        onInput={onInput}
        onKeyDown={(event: KeyboardEvent) => {
          mentions.onKeydown(event);
        }}
        data-scope="mentions"
        data-part="textarea"
      />
      <MentionsVessel
        open={mentions.open()}
        matches={mentions.matches()}
        active={mentions.active()}
        anchor={fieldEl()}
        onInsert={mentions.insert}
        onActiveChange={mentions.setActive}
        onOpenChange={(open) => {
          if (!open) mentions.close();
        }}
      />
    </div>
  );
}

injectComponentStyle("mentions");
