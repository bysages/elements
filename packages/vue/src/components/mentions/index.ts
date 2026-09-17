import { Popover as ArkPopover } from "@ark-ui/vue/popover";
import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h, ref, type PropType, type Ref } from "vue";
import { Teleport } from "vue";

import { Field } from "../field";
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

/** The vessel: the candidates themselves as a floating card. The anchor
 * is virtual — a live rectangle off the host's field — so a host keeps
 * its own anatomy (the textarea rides where the host puts it) and the
 * vessel still points at the right place. Shares the detection state
 * with the host through `useMentions`. */
export const MentionsVessel = defineComponent({
  name: "MentionsVessel",
  props: {
    open: { type: Boolean, default: false },
    matches: { type: Array as PropType<MentionEntry[]>, default: () => [] },
    active: { type: Number, default: 0 },
    anchor: { type: Object as PropType<HTMLTextAreaElement | null>, default: null },
  },
  emits: {
    insert: (_entry: MentionEntry) => true,
    "update:active": (_index: number) => true,
    "update:open": (_open: boolean) => true,
  },
  setup(props, ctx: SetupContext) {
    return () =>
      h(
        ArkPopover.Root,
        {
          open: props.open,
          "onUpdate:open": (open: boolean) => ctx.emit("update:open", open),
          positioning: {
            placement: "bottom-start",
            getAnchorRect: () => props.anchor?.getBoundingClientRect() ?? null,
          },
        },
        () => [
          h(Teleport, { to: "body" }, [
            h(ArkPopover.Positioner, () =>
              h(ArkPopover.Content, { asChild: true }, () =>
                h(
                  "div",
                  { "data-scope": "mentions", "data-part": "popup" },
                  props.matches.map((entry, index) =>
                    h(
                      "div",
                      {
                        key: entry.value,
                        "data-scope": "mentions",
                        "data-part": "option",
                        "data-active": index === props.active ? "" : undefined,
                        onMouseEnter: () => ctx.emit("update:active", index),
                        // The pointer confirms without moving the
                        // keyboard's active row out from under it.
                        onMouseDown: (event: MouseEvent) => event.preventDefault(),
                        onClick: () => ctx.emit("insert", entry),
                      },
                      () => entry.label,
                    ),
                  ),
                ),
              ),
            ),
          ]),
        ],
      );
  },
});

/**
 * @-mentions: a plain textarea that, when the text before the caret ends
 * with the trigger character followed by a token, offers the matching
 * candidates in a small anchored vessel; choosing one replaces the token
 * with `trigger + label` and hands the whole text back through
 * `update:modelValue`. Arrows move, Enter inserts, Escape dismisses.
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
export const Mentions = defineComponent({
  name: "Mentions",
  props: {
    items: { type: Array as PropType<MentionEntry[]>, default: () => [] },
    modelValue: { type: String, default: undefined },
    trigger: { type: String, default: "@" },
    placeholder: { type: String, default: undefined },
    autoresize: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
  },
  emits: ["update:modelValue"],
  setup(props, ctx: SetupContext) {
    // Mirrors the controlled value when the caller does not pass one.
    const internal = ref("");
    // The field part is a component; its root element rides `$el`.
    const fieldRef = ref<{ $el?: HTMLTextAreaElement } | null>(null);
    const el = (): HTMLTextAreaElement | null =>
      (fieldRef.value?.$el as HTMLTextAreaElement | undefined) ?? null;

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
      h("div", { ...ctx.attrs, "data-scope": "mentions", "data-part": "root" }, [
        h(Field.Textarea as never, {
          ref: fieldRef as Ref,
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
        h(MentionsVessel, {
          open: mentions.open.value,
          matches: mentions.matches.value,
          active: mentions.active.value,
          anchor: el(),
          onInsert: mentions.insert,
          "onUpdate:active": (index: number) => (mentions.active.value = index),
          "onUpdate:open": (open: boolean) => {
            if (!open) mentions.close();
          },
        }),
      ]);
  },
});

injectComponentStyle("mentions");
