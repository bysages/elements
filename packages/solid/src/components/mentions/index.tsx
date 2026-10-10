import { Field as ArkField } from "@ark-ui/solid/field";
import { Popover as ArkPopover } from "@ark-ui/solid/popover";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, createSignal, splitProps } from "solid-js";
import type { JSX } from "solid-js";
import { Portal } from "solid-js/web";

import { defineFamily, withSelfRoot } from "../../internal/family";
import { useElementId } from "../../internal/id";
import { Popover } from "../popover";
import { useMentions } from "./use-mentions";

/** The Anchor's polymorphic wiring is div-typed at the API boundary; the
 * textarea host supplies the concrete element type. */
type MentionsAnchorProps = JSX.HTMLAttributes<HTMLTextAreaElement>;

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
  /** The host field's rung, so the rows keep the field's register. */
  size?: "sm" | "md" | "lg";
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
  const id = useElementId("mentions-vessel");

  return (
    <ArkPopover.Root
      id={id()}
      open={props.open ?? false}
      onOpenChange={(details) => props.onOpenChange?.(details.open)}
      positioning={
        props.children
          ? { placement: "bottom-start" }
          : {
              placement: "bottom-start",
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
      <Portal>
        <ArkPopover.Positioner>
          <ArkPopover.Content
            asChild={(contentProps) => (
              <div
                {...contentProps()}
                role="listbox"
                data-scope="mentions"
                data-part="popup"
                data-size={props.size ?? "md"}
              >
                <For each={props.matches ?? []}>
                  {(entry, index) => (
                    <div
                      role="option"
                      aria-selected={index() === (props.active ?? 0)}
                      tabindex={-1}
                      data-scope="mentions"
                      data-part="option"
                      data-active={index() === (props.active ?? 0) ? "" : undefined}
                      onMouseEnter={() => props.onActiveChange?.(index())}
                      // The pointer confirms without moving the
                      // keyboard's active row out from under it.
                      onMouseDown={(event: MouseEvent) => event.preventDefault()}
                      onClick={() => props.onInsert?.(entry)}
                      onKeyDown={(event: KeyboardEvent) => {
                        if (event.key !== "Enter" && event.key !== " ") return;
                        event.preventDefault();
                        props.onInsert?.(entry);
                      }}
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
});

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
  /** One rung of the control-height ladder for the resting field. */
  size?: "sm" | "md" | "lg";
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
function MentionsImpl(props: MentionsProps) {
  const [own, rest] = splitProps(props, [
    "items",
    "value",
    "trigger",
    "placeholder",
    "autoresize",
    "invalid",
    "size",
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
    <div {...rest} data-scope="mentions" data-part="root" data-size={own.size ?? "md"}>
      <MentionsVessel
        open={mentions.open()}
        matches={mentions.matches()}
        active={mentions.active()}
        size={own.size ?? "md"}
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
