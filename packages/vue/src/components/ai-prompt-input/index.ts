import { injectComponentStyle } from "@bysages/core/styling";
import type { Component, PropType, SetupContext, VNode } from "vue";
import { computed, defineComponent, h, onMounted, ref, watch } from "vue";

import { withSelfRoot } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { useComponentMessages } from "../../internal/messages";
import { Button } from "../button";
import { Field } from "../field";
import { MentionsVessel, type MentionEntry } from "../mentions";
import { useMentions } from "../mentions/use-mentions";
import {
  insertEditorToken,
  insertLineBreak,
  readCaret,
  renderEditor,
  serializeEditor,
} from "./editor";

const arrowUpIcon = () => iconNode("arrow-up", { width: 14, height: 14 });

const stopIcon = () => iconNode("square", { width: 14, height: 14 });

/** The prompt vessel: the shared field textarea — self-growing on the
 * machine's autoresize — with the submit seal riding its last line. With
 * mentions it becomes a token editor: choices stay rich, while the model
 * still reads and writes ordinary composer text. Around the body, slots
 * answer the composer's anatomy: `header` for attachments riding above,
 * `leading` for the tools at the text's left, `trailing` for the seal
 * itself, `footer` for the tools beneath, and `footer-end` for the
 * controls that close the footer row. Controlled — bind `v-model` and
 * take the text on `submit`. Enter sends; Shift+Enter breaks the line. */
export const PromptInput = withSelfRoot(
  defineComponent({
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
      /** Mention candidates for the field. The field holds rich tokens
       * after a choice; the bound value remains plain text. */
      mentions: {
        type: Object as PropType<{
          items: MentionEntry[];
          trigger?: string;
          triggers?: string | string[];
          insertOnSelect?: boolean;
        }>,
        default: undefined,
      },
    },
    emits: {
      "update:modelValue": (_value: string) => true,
      select: (_entry: MentionEntry) => true,
      submit: (_value: string) => true,
      stop: () => true,
    },
    setup(props, { emit, attrs, slots }: SetupContext) {
      injectComponentStyle("ai");
      const messages = useComponentMessages();
      const { "aria-label": consumerLabel, ...formAttrs } = attrs;
      const hostId = useElementId("ai-prompt", attrs);
      const mentionsId = computed(() => `${hostId.value}:mentions`);

      const fieldRef = ref<{ $el?: HTMLTextAreaElement } | null>(null);
      const editorRef = ref<HTMLElement | null>(null);

      onMounted(() => {
        const editor = editorRef.value;
        if (!editor) return;
        renderEditor(
          editor,
          props.modelValue,
          props.mentions?.items ?? [],
          props.mentions?.triggers,
        );
        editor.toggleAttribute("data-empty", !props.modelValue);
      });

      const el = (): HTMLTextAreaElement | null =>
        (fieldRef.value?.$el as HTMLTextAreaElement | undefined) ?? null;

      const mentions = useMentions(
        () => ({
          items: props.mentions?.items ?? [],
          trigger: props.mentions?.trigger,
          triggers: props.mentions?.triggers,
        }),
        el,
        {
          getCaret: () => (props.mentions ? readCaret(editorRef.value!) : undefined),
          getText: () =>
            props.mentions ? serializeEditor(editorRef.value!) : (el()?.value ?? props.modelValue),
          setText: (next) => emit("update:modelValue", next),
          select: (entry) => {
            emit("select", entry);
            return props.mentions?.insertOnSelect !== false;
          },
        },
      );
      const mentionsActive = computed(() => props.mentions != null);

      const publishEditor = () => {
        const editor = editorRef.value;
        if (!editor) return;
        const next = serializeEditor(editor);
        editor.toggleAttribute("data-empty", !next);
        emit("update:modelValue", next);
      };

      const insertChoice = (entry: MentionEntry) => {
        const editor = editorRef.value;
        if (!editor || entry.disabled || props.mentions?.insertOnSelect === false) {
          mentions.close();
          return;
        }

        emit("select", entry);
        const next = insertEditorToken(
          editor,
          entry,
          mentions.activeTrigger.value,
          mentions.anchorIndex.value,
          mentions.caretIndex.value,
        );
        editor.toggleAttribute("data-empty", !next);
        emit("update:modelValue", next);
        mentions.close();
      };

      const editorKeydown = (event: KeyboardEvent) => {
        if (event.isComposing || event.keyCode === 229) return;

        if (event.key === "Enter" && event.shiftKey) {
          event.preventDefault();
          const editor = editorRef.value;
          if (!editor) return;
          emit("update:modelValue", insertLineBreak(editor));
          return;
        }

        if (
          mentions.open.value &&
          (event.key === "Enter" || event.key === " ") &&
          !mentions.matches.value[mentions.active.value]?.disabled
        ) {
          const entry = mentions.matches.value[mentions.active.value];
          if (!entry) return;
          event.preventDefault();
          insertChoice(entry);
          return;
        }

        if (mentions.onKeydown(event)) return;

        if (event.key === "Enter") {
          event.preventDefault();
          submit();
        }
      };

      const submit = () => {
        const value = props.modelValue.trim();
        if (!value || props.disabled || props.busy) return;
        emit("submit", value);
        emit("update:modelValue", "");
      };

      watch(
        () => props.modelValue,
        (value) => {
          const editor = editorRef.value;
          if (!editor || serializeEditor(editor) === value) return;
          renderEditor(editor, value, props.mentions?.items ?? [], props.mentions?.triggers);
          editor.toggleAttribute("data-empty", !value);
        },
      );

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
                "aria-label": messages.value.ai.stop,
                disabled: props.disabled,
                onClick: () => emit("stop"),
              }
            : {
                variant: "solid",
                size: "sm",
                square: true,
                type: "submit",
                "aria-label": messages.value.ai.send,
                disabled: props.disabled || !props.modelValue.trim(),
              },
          () => [props.busy ? stopIcon() : arrowUpIcon()],
        );

      return () => {
        const footer = slots.footer?.();
        const hasFooter = !!(footer && footer.length);
        const sealNode = seal();
        const field = mentionsActive.value
          ? () =>
              h("div", {
                ref: editorRef,
                key: "ai-prompt-editor",
                contenteditable: props.disabled ? "false" : "true",
                role: "textbox",
                "aria-multiline": "true",
                "aria-label": consumerLabel ?? messages.value.ai.conversation,
                "aria-expanded": mentions.open.value,
                "aria-controls": mentions.open.value ? `${mentionsId.value}:popup` : undefined,
                "aria-disabled": props.disabled ? "true" : undefined,
                "data-scope": "ai",
                "data-part": "prompt-editor",
                "data-empty": props.modelValue ? undefined : "",
                "data-placeholder": props.placeholder,
                "data-disabled": props.disabled ? "" : undefined,
                onInput: () => {
                  publishEditor();
                  if (!props.disabled) mentions.onInput();
                },
                onKeydown: editorKeydown,
              })
          : () =>
              h(Field.Textarea as Component, {
                ref: fieldRef,
                autoresize: true,
                rows: 1,
                modelValue: props.modelValue,
                placeholder: props.placeholder,
                "aria-label": consumerLabel ?? messages.value.ai.conversation,
                disabled: props.disabled,
                "onUpdate:modelValue": (value: string) => emit("update:modelValue", value),
                onInput: () => mentions.onInput(),
                onKeydown: (event: KeyboardEvent) => {
                  if (event.isComposing || event.keyCode === 229) return;
                  if (mentions.onKeydown(event)) return;
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    submit();
                  }
                },
              });

        return h(
          "form",
          {
            ...formAttrs,
            "data-scope": "ai",
            "data-part": "prompt",
            onSubmit: (event: Event) => {
              event.preventDefault();
              submit();
            },
          },
          () => [
            row("prompt-header", slots.header?.()),
            h("div", { "data-scope": "ai", "data-part": "prompt-main" }, () => [
              row("prompt-leading", slots.leading?.()),
              mentionsActive.value ? field() : h(Field.Root as Component, () => [field()]),
              mentionsActive.value
                ? h(MentionsVessel, {
                    open: mentions.open.value,
                    matches: mentions.matches.value,
                    active: mentions.active.value,
                    anchor: editorRef.value,
                    id: mentionsId.value,
                    onInsert: insertChoice,
                    "onUpdate:active": (index: number) => (mentions.active.value = index),
                    "onUpdate:open": (open: boolean) => {
                      if (!open) mentions.close();
                    },
                  })
                : null,
              row(
                "prompt-trailing",
                hasFooter ? slots.trailing?.() : (slots.trailing?.() ?? [sealNode]),
              ),
            ]),
            hasFooter
              ? h("div", { "data-scope": "ai", "data-part": "prompt-footer" }, () => [
                  ...footer,
                  row("prompt-end", [...(slots.footerEnd?.() ?? []), sealNode]),
                ])
              : null,
          ],
        );
      };
    },
  }),
);
export { PromptInput as AiPromptInput };
