import { Popover as ArkPopover } from "@ark-ui/vue/popover";
import { injectComponentStyle } from "@bysages/core/styling";
import type { SetupContext } from "vue";
import { computed, defineComponent, h, ref, type PropType, type Ref } from "vue";

import { defineFamily, withSelfRoot } from "../../internal/family";
import { definePositioner, type FloatingPortalTarget } from "../../internal/floating";
import { useElementId } from "../../internal/id";
import { withPresenceEnter, withPresenceRoot } from "../../internal/presence";
import { Field } from "../field";
import { Icon } from "../icon";
import { Popover } from "../popover";
import { useMentions, type MentionCommitKey } from "./use-mentions";

export type { MentionCommitKey, UseMentionsOptions, UseMentionsHandlers } from "./use-mentions";
export { useMentions } from "./use-mentions";

const MentionsPositioner = definePositioner("SMentionsPositioner", ArkPopover.Positioner);

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
  /** Extra consumer data carried back through `select`. */
  meta?: Record<string, unknown>;
}

export type MentionTriggers = string | string[];
export type MentionPlacement = "bottom-start" | "top-start";

export interface MentionsProps {
  /** The candidates offered once a trigger character is typed. */
  items: MentionEntry[];
  /** The text held by the field. Supply it to control the field;
   * changes are reported via `update:modelValue`. */
  modelValue?: string;
  /** The character that summons the candidates. */
  trigger?: string;
  /** One or more summoning characters, such as `@` and `/`. */
  triggers?: MentionTriggers;
  /** Keep composer text untouched when a candidate is selected. */
  insertOnSelect?: boolean;
  /** Keys that choose the highlighted candidate. */
  commitKeys?: MentionCommitKey[];
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
    const id = useElementId("mentions-popup", ctx.attrs);
    const groups = computed(() => {
      const ordered: Array<{
        name: string;
        entries: Array<{ entry: MentionEntry; index: number }>;
      }> = [];
      const byName = new Map<
        string,
        { name: string; entries: Array<{ entry: MentionEntry; index: number }> }
      >();

      props.matches.forEach((entry, index) => {
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
    });

    const optionId = (index: number) => `${id.value}:option-${index}`;

    return () => {
      const activeEntry = props.matches[props.active];
      return h(
        "div",
        {
          ...ctx.attrs,
          id: id.value,
          "data-scope": "mentions",
          "data-part": "popup",
          "data-size": props.size,
          role: "listbox",
          "aria-activedescendant":
            activeEntry && !activeEntry.disabled ? optionId(props.active) : undefined,
        },
        groups.value.flatMap((group, groupIndex) => {
          const labelId = group.name ? `${id.value}:group-${groupIndex}` : undefined;
          const options = group.entries.map(({ entry, index }) =>
            h(
              "div",
              {
                key: `${entry.id ?? entry.value}:${index}`,
                id: optionId(index),
                role: "option",
                "aria-selected": index === props.active && !entry.disabled,
                "aria-disabled": entry.disabled ? "true" : undefined,
                tabindex: -1,
                "data-scope": "mentions",
                "data-part": "option",
                "data-active": index === props.active && !entry.disabled ? "" : undefined,
                "data-disabled": entry.disabled ? "" : undefined,
                onMouseenter: () => {
                  if (!entry.disabled) ctx.emit("update:active", index);
                },
                // Confirm on press, before the floating vessel can tear
                // down; focus stays on the field.
                onMousedown: (event: MouseEvent) => {
                  if (event.button !== 0) return;
                  event.preventDefault();
                  if (!entry.disabled) ctx.emit("insert", entry);
                },
                onKeydown: (event: KeyboardEvent) => {
                  if (event.key !== "Enter" && event.key !== " ") return;
                  event.preventDefault();
                  if (!entry.disabled) ctx.emit("insert", entry);
                },
              },
              () => [
                entry.icon ? h(Icon, { name: entry.icon }) : null,
                h("span", { "data-scope": "mentions", "data-part": "option-main" }, [
                  h("span", { "data-scope": "mentions", "data-part": "option-label" }, entry.label),
                  entry.description
                    ? h(
                        "span",
                        { "data-scope": "mentions", "data-part": "option-description" },
                        entry.description,
                      )
                    : null,
                ]),
                entry.kind
                  ? h("span", { "data-scope": "mentions", "data-part": "option-kind" }, entry.kind)
                  : null,
              ],
            ),
          );

          if (!group.name) return options;
          return [
            h(
              "div",
              {
                key: `group:${group.name}`,
                role: "group",
                "aria-labelledby": labelId,
                "data-scope": "mentions",
                "data-part": "group",
              },
              [
                h(
                  "div",
                  { id: labelId, "data-scope": "mentions", "data-part": "group-label" },
                  group.name,
                ),
                ...options,
              ],
            ),
          ];
        }),
      );
    };
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
      anchor: { type: Object as PropType<HTMLElement | null>, default: null },
      /** The host field's rung, so the rows keep the field's register. */
      size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
      /** Which side of the composer hosts the candidates. */
      placement: { type: String as PropType<MentionPlacement>, default: "bottom-start" },
      portal: { type: [Boolean, String] as PropType<FloatingPortalTarget>, default: false },
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
            ids: { content: `${id.value}:popup` },
            open: props.open,
            autoFocus: false,
            "onUpdate:open": (open: boolean) => ctx.emit("update:open", open),
            positioning: {
              placement: props.placement,
              getAnchorRect: () => props.anchor?.getBoundingClientRect() ?? null,
            },
          }),
          () => [
            h(MentionsPositioner, { portal: props.portal }, () =>
              h(ArkPopover.Content, { asChild: true }, () =>
                h(
                  MentionsPopup,
                  {
                    id: `${id.value}:popup`,
                    size: props.size,
                    matches: props.matches,
                    active: props.active,
                    onInsert: (entry: MentionEntry) => ctx.emit("insert", entry),
                    "onUpdate:active": (index: number) => ctx.emit("update:active", index),
                  },
                  ctx.slots.option ? { option: ctx.slots.option } : undefined,
                ),
              ),
            ),
          ],
        );
    },
  }),
);

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
const MentionsFacade = defineComponent({
  name: "Mentions",
  inheritAttrs: false,
  props: {
    items: { type: Array as PropType<MentionEntry[]>, default: () => [] },
    modelValue: { type: String, default: undefined },
    trigger: { type: String, default: "@" },
    triggers: { type: [String, Array] as PropType<MentionTriggers>, default: undefined },
    insertOnSelect: { type: Boolean, default: true },
    commitKeys: {
      type: Array as PropType<MentionCommitKey[]>,
      default: undefined,
    },
    placeholder: { type: String, default: undefined },
    autoresize: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    /** One rung of the control-height ladder for the resting field. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
    portal: { type: [Boolean, String] as PropType<FloatingPortalTarget>, default: false },
  },
  emits: {
    "update:modelValue": (_value: string) => true,
    select: (_entry: MentionEntry) => true,
  },
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

    const mentions = useMentions(
      () => ({
        items: props.items,
        trigger: props.trigger,
        triggers: props.triggers,
        commitKeys: props.commitKeys,
      }),
      el,
      {
        getText: () => el()?.value ?? value(),
        setText: (next) => {
          internal.value = next;
          ctx.emit("update:modelValue", next);
        },
        select: (entry) => {
          ctx.emit("select", entry);
          return props.insertOnSelect;
        },
      },
    );

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
              ids: { content: `${hostId.value}:vessel:popup` },
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
                  "aria-expanded": mentions.open.value,
                  "aria-controls": mentions.open.value ? `${hostId.value}:vessel:popup` : undefined,
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
              h(MentionsPositioner, { portal: props.portal }, () =>
                h(ArkPopover.Content, { asChild: true }, () =>
                  h(MentionsPopup, {
                    id: `${hostId.value}:vessel:popup`,
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
