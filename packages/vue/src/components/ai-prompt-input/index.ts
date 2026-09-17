import { injectComponentStyle } from "@bysages/core";
import type { Component, PropType, SetupContext, VNode } from "vue";
import { computed, defineComponent, h, ref } from "vue";

import { Button } from "../button";
import { Field } from "../field";
import { MentionsVessel, type MentionEntry } from "../mentions";
import { useMentions } from "../mentions/use-mentions";

const arrowUpGlyph = () =>
  h(
    "svg",
    {
      viewBox: "0 0 16 16",
      width: 14,
      height: 14,
      "aria-hidden": "true",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": "1.5",
      "stroke-linecap": "square",
    },
    [h("path", { d: "M8 13V3M3.5 7.5 8 3l4.5 4.5" })],
  );

const stopGlyph = () =>
  h("svg", { viewBox: "0 0 16 16", width: 14, height: 14, "aria-hidden": "true" }, [
    h("rect", { x: 4.5, y: 4.5, width: 7, height: 7, fill: "currentColor" }),
  ]);

/** The prompt vessel: the shared field textarea — self-growing on the
 * machine's autoresize — with the submit seal riding its last line.
 * Around the body, slots answer the composer's anatomy: `header` for
 * attachments riding above, `leading` for the tools at the text's
 * left, `trailing` for the seal itself, `footer` for the tools beneath,
 * and `footer-end` for the controls that close the footer row — the
 * seal falls there by default, so a model picker dropped in rides the
 * send's shoulder. An empty slot renders no part, so the bare vessel
 * stays one quiet line. Controlled — bind `v-model` and take the text
 * on `submit`. Enter sends; Shift+Enter breaks the line. While `busy`
 * the seal becomes a stop seal and Enter holds its breath. */
export const PromptInput = defineComponent({
  name: "AiPromptInput",
  props: {
    /** The draft in the vessel — bind `v-model`; it clears itself on
     * a successful submit. */
    modelValue: { type: String, default: "" },
    /** The quiet invitation before the reader types. */
    placeholder: { type: String, default: "Send a message" },
    /** Still the words on the canvas, but the submit seal does
     * nothing and Enter stays a line break. */
    disabled: { type: Boolean, default: false },
    /** The machine is working — the seal becomes a stop seal and
     * Enter holds its breath. */
    busy: { type: Boolean, default: false },
    /** Mention candidates for the field: pass the roster and the summon
     * character (`@` unless told otherwise) and the vessel rides the
     * textarea. While candidates are up, Enter inserts and the send
     * waits. */
    mentions: {
      type: Object as PropType<{ items: MentionEntry[]; trigger?: string }>,
      default: undefined,
    },
  },
  emits: {
    "update:modelValue": (_value: string) => true,
    submit: (_value: string) => true,
    stop: () => true,
  },
  setup(props, { emit, attrs, slots }: SetupContext) {
    // The field part is a component; its root element rides `$el`.
    const fieldRef = ref<{ $el?: HTMLTextAreaElement } | null>(null);
    const el = (): HTMLTextAreaElement | null =>
      (fieldRef.value?.$el as HTMLTextAreaElement | undefined) ?? null;

    const mentions = useMentions(
      () => ({ items: props.mentions?.items ?? [], trigger: props.mentions?.trigger }),
      el,
      {
        getText: () => el()?.value ?? props.modelValue,
        setText: (next) => emit("update:modelValue", next),
      },
    );
    // The vessel only rides along when a roster was actually given.
    const mentionsActive = computed(() => props.mentions != null);

    const submit = () => {
      const value = props.modelValue.trim();
      if (!value || props.disabled || props.busy) return;
      emit("submit", value);
      emit("update:modelValue", "");
    };

    // An empty slot leaves no part in the anatomy — the bare vessel
    // keeps its single-line posture. Children ride as a function so the
    // caller's popups keep their reactive update path.
    const row = (part: string, content: VNode[] | undefined) =>
      content && content.length
        ? h("div", { "data-scope": "ai", "data-part": part }, () => content)
        : null;

    const seal = () =>
      h(
        Button,
        props.busy
          ? {
              variant: "solid",
              size: "sm",
              square: true,
              type: "button",
              "aria-label": "Stop",
              disabled: props.disabled,
              onClick: () => emit("stop"),
            }
          : {
              variant: "solid",
              size: "sm",
              square: true,
              type: "submit",
              "aria-label": "Send",
              disabled: props.disabled || !props.modelValue.trim(),
            },
        () => [props.busy ? stopGlyph() : arrowUpGlyph()],
      );

    return () => {
      const footer = slots.footer?.();
      const hasFooter = !!(footer && footer.length);
      const sealNode = seal();

      return h(
        "form",
        {
          ...attrs,
          "data-scope": "ai",
          "data-part": "prompt",
          onSubmit: (event: Event) => {
            event.preventDefault();
            submit();
          },
        },
        // Every row's children ride as a function: slot content passed
        // through plain arrays loses its reactive update path, and the
        // popups summoned inside it (menu, select) never mount.
        () => [
          row("prompt-header", slots.header?.()),
          h("div", { "data-scope": "ai", "data-part": "prompt-main" }, () => [
            row("prompt-leading", slots.leading?.()),
            h(Field.Root as Component, () =>
              h(Field.Textarea as Component, {
                ref: fieldRef,
                autoresize: true,
                rows: 1,
                modelValue: props.modelValue,
                placeholder: props.placeholder,
                disabled: props.disabled,
                "onUpdate:modelValue": (value: string) => emit("update:modelValue", value),
                onInput: () => mentions.onInput(),
                onKeydown: (event: KeyboardEvent) => {
                  // The candidates eat their keys first; only on a
                  // quiet field does Enter become the send.
                  if (mentions.onKeydown(event)) return;
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    submit();
                  }
                },
              }),
            ),
            mentionsActive.value
              ? h(MentionsVessel, {
                  open: mentions.open.value,
                  matches: mentions.matches.value,
                  active: mentions.active.value,
                  anchor: el(),
                  onInsert: mentions.insert,
                  "onUpdate:active": (index: number) => (mentions.active.value = index),
                  "onUpdate:open": (open: boolean) => {
                    if (!open) mentions.close();
                  },
                })
              : null,
            // With a tool row beneath, the seal sinks into it — the
            // send belongs at the row's far end, with the tools.
            row(
              "prompt-trailing",
              hasFooter ? slots.trailing?.() : (slots.trailing?.() ?? [sealNode]),
            ),
          ]),
          hasFooter
            ? h("div", { "data-scope": "ai", "data-part": "prompt-footer" }, () => [
                ...footer,
                // The row closes with an end group: the caller's send-side
                // controls, with the seal as their quiet last member.
                row("prompt-end", [...(slots.footerEnd?.() ?? []), sealNode]),
              ])
            : null,
        ],
      );
    };
  },
});

injectComponentStyle("ai");

export { PromptInput as AiPromptInput };
