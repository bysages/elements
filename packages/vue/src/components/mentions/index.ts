import { Popover as ArkPopover } from "@ark-ui/vue/popover";
import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h, ref, type PropType, type Ref } from "vue";

import { defineFamily, withSelfRoot } from "../../internal/family";
import { useElementId } from "../../internal/id";
import { withPresenceEnter, withPresenceRoot } from "../../internal/presence";
import { Field } from "../field";
import { Popover } from "../popover";
import { useMentions } from "./use-mentions";

export type { UseMentionsOptions, UseMentionsHandlers } from "./use-mentions";
export { useMentions } from "./use-mentions";

export interface MentionEntry {
  label: string;
  value: string;
}

export interface MentionsProps {
  /** The candidates offered once the trigger character is typed. */
  items: MentionEntry[];
  /** The text held by the field. Supply it to control the field;
   * changes are reported via `update:modelValue`. */
  modelValue?: string;
  /** The character that summons the candidates. */
  trigger?: string;
  placeholder?: string;
  /** Let the field grow with its text instead of holding `rows`. */
  autoresize?: boolean;
  /** Standing alone, the field styles itself from this flag; inside a
   * `Field.Root` the field's own invalid state takes over. */
  invalid?: boolean;
}

/** The candidates themselves as a floating card. Rendered inside the
 * popover's Content via `asChild`, so the machine's content wiring
 * lands on this card; `attrs` stay first so the machine can layer
 * state on top without covering the anatomy names. */
const MentionsPopup = defineComponent({
  name: "MentionsPopup",
  inheritAttrs: false,
  props: {
    /** The host field's rung, so the rows keep the field's register. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
    matches: { type: Array as PropType<MentionEntry[]>, default: () => [] },
    active: { type: Number, default: 0 },
  },
  emits: {
    insert: (_entry: MentionEntry) => true,
    "update:active": (_index: number) => true,
  },
  setup(props, ctx) {
    return () =>
      h(
        "div",
        {
          ...ctx.attrs,
          "data-scope": "mentions",
          "data-part": "popup",
          "data-size": props.size,
          role: "listbox",
        },
        props.matches.map((entry, index) =>
          h(
            "div",
            {
              key: entry.value,
              role: "option",
              "aria-selected": index === props.active,
              tabindex: -1,
              "data-scope": "mentions",
              "data-part": "option",
              "data-active": index === props.active ? "" : undefined,
              onMouseEnter: () => ctx.emit("update:active", index),
              // The pointer confirms without moving the
              // keyboard's active row out from under it.
              onMouseDown: (event: MouseEvent) => event.preventDefault(),
              onClick: () => ctx.emit("insert", entry),
              onKeyDown: (event: KeyboardEvent) => {
                if (event.key !== "Enter" && event.key !== " ") return;
                event.preventDefault();
                ctx.emit("insert", entry);
              },
            },
            () => entry.label,
          ),
        ),
      );
  },
});

/** The vessel: the candidates themselves as a floating card. The anchor
 * is virtual — a live rectangle off the host's field — so a host keeps
 * its own anatomy (the textarea rides where the host puts it) and the
 * vessel still points at the right place. Shares the detection state
 * with the host through `useMentions`. */
export const MentionsVessel = withSelfRoot(
  defineComponent({
    name: "MentionsVessel",
    props: {
      open: { type: Boolean, default: false },
      matches: { type: Array as PropType<MentionEntry[]>, default: () => [] },
      active: { type: Number, default: 0 },
      anchor: { type: Object as PropType<HTMLTextAreaElement | null>, default: null },
      /** The host field's rung, so the rows keep the field's register. */
      size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
    },
    emits: {
      insert: (_entry: MentionEntry) => true,
      "update:active": (_index: number) => true,
      "update:open": (_open: boolean) => true,
    },
    setup(props, ctx: SetupContext) {
      injectComponentStyle("mentions");
      const id = useElementId("mentions", ctx.attrs);

      return () =>
        h(
          withPresenceRoot(ArkPopover.Root as never),
          withPresenceEnter({
            id: id.value,
            open: props.open,
            "onUpdate:open": (open: boolean) => ctx.emit("update:open", open),
            positioning: {
              placement: "bottom-start",
              getAnchorRect: () => props.anchor?.getBoundingClientRect() ?? null,
            },
          }),
          () => [
            h(ArkPopover.Positioner, () =>
              h(ArkPopover.Content, { asChild: true }, () =>
                h(MentionsPopup, {
                  size: props.size,
                  matches: props.matches,
                  active: props.active,
                  onInsert: (entry: MentionEntry) => ctx.emit("insert", entry),
                  "onUpdate:active": (index: number) => ctx.emit("update:active", index),
                }),
              ),
            ),
          ],
        );
    },
  }),
);

/**
 * @-mentions: a plain textarea that, when the text before the caret ends
 * with the trigger character followed by a token, offers the matching
 * candidates in a small anchored vessel; choosing one replaces the token
 * with `trigger + label` and hands the whole text back through
 * `update:modelValue`. Arrows move, Enter inserts, Escape dismisses.
 *
 * The field is the shared `Field.Textarea` — field wiring (label ids,
 * the invalid state, autoresize) rides on it for free — and the vessel
 * anchors through the popover's own `Anchor` part wrapped around the
 * field, so the machine, not a local rectangle, points the popup at the
 * input. Composers that keep their own field anatomy (the AI prompt
 * input) skip this shell and wire `useMentions` plus `MentionsVessel`
 * themselves.
 */
const MentionsFacade = defineComponent({
  name: "Mentions",
  props: {
    items: { type: Array as PropType<MentionEntry[]>, default: () => [] },
    modelValue: { type: String, default: undefined },
    trigger: { type: String, default: "@" },
    placeholder: { type: String, default: undefined },
    autoresize: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    /** One rung of the control-height ladder for the resting field. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, ctx: SetupContext) {
    // Mirrors the controlled value when the caller does not pass one.
    const hostId = useElementId("mentions", ctx.attrs);
    const internal = ref("");
    // The shared root owns element lookup, so no layout shell is needed
    // just to reach the field's real textarea.
    const rootRef = ref<HTMLElement | null>(null);
    const el = (): HTMLTextAreaElement | null =>
      rootRef.value?.querySelector<HTMLTextAreaElement>(
        'textarea[data-scope="mentions"][data-part="textarea"]',
      ) ?? null;

    const value = () => props.modelValue ?? internal.value;

    const mentions = useMentions(() => ({ items: props.items, trigger: props.trigger }), el, {
      getText: () => el()?.value ?? value(),
      setText: (next) => {
        internal.value = next;
        ctx.emit("update:modelValue", next);
      },
    });

    const onInput = () => {
      const node = el();
      if (!node) return;
      internal.value = node.value;
      ctx.emit("update:modelValue", node.value);
      mentions.onInput();
    };

    return () =>
      h(
        "div",
        {
          ...ctx.attrs,
          ref: rootRef as Ref,
          "data-scope": "mentions",
          "data-part": "root",
          "data-size": props.size,
        },
        [
          h(
            withPresenceRoot(ArkPopover.Root as never),
            withPresenceEnter({
              id: `${hostId.value}:vessel`,
              open: mentions.open.value,
              "onUpdate:open": (open: boolean) => {
                if (!open) mentions.close();
              },
              positioning: { placement: "bottom-start" },
            }),
            () => [
              h(ArkPopover.Anchor, { asChild: true }, () =>
                h(Field.Textarea as never, {
                  autoresize: props.autoresize,
                  invalid: props.invalid,
                  rows: 3,
                  placeholder: props.placeholder,
                  modelValue: value(),
                  "onUpdate:modelValue": (next: string) => {
                    internal.value = next;
                    ctx.emit("update:modelValue", next);
                  },
                  onInput,
                  onKeydown: mentions.onKeydown,
                  "data-scope": "mentions",
                  "data-part": "textarea",
                }),
              ),
              h(ArkPopover.Positioner, () =>
                h(ArkPopover.Content, { asChild: true }, () =>
                  h(MentionsPopup, {
                    size: props.size,
                    matches: mentions.matches.value,
                    active: mentions.active.value,
                    onInsert: mentions.insert,
                    "onUpdate:active": (index: number) => (mentions.active.value = index),
                  }),
                ),
              ),
            ],
          ),
        ],
      );
  },
});

export const Mentions = defineFamily(MentionsFacade, Popover) as typeof MentionsFacade &
  typeof Popover;
