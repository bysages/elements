import { injectComponentStyle } from "@bysages/core";
import type { PropType, SetupContext } from "vue";
import { defineComponent, h } from "vue";

import { Button } from "../button";
import { Field } from "../field";

/** The prompt vessel: the shared field textarea — self-growing on the
 * machine's autoresize — over a footer row carrying the submit seal.
 * Controlled — bind `v-model` and take the text on `submit`. Enter
 * sends; Shift+Enter breaks the line. */
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
  },
  emits: {
    "update:modelValue": (value: string) => true,
    submit: (value: string) => true,
  },
  setup(props, { emit, attrs }: SetupContext) {
    const submit = () => {
      const value = props.modelValue.trim();
      if (!value || props.disabled) return;
      emit("submit", value);
      emit("update:modelValue", "");
    };

    return () =>
      h(
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
        [
          h(Field.Root as any, () =>
            h(Field.Textarea as any, {
              autoresize: true,
              rows: 1,
              modelValue: props.modelValue,
              placeholder: props.placeholder,
              disabled: props.disabled,
              "onUpdate:modelValue": (value: string) => emit("update:modelValue", value),
              onKeydown: (event: KeyboardEvent) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  submit();
                }
              },
            }),
          ),
          h("div", { "data-scope": "ai", "data-part": "prompt-footer" }, [
            h(
              Button,
              {
                variant: "solid",
                size: "sm",
                square: true,
                type: "submit",
                "aria-label": "Send",
                disabled: props.disabled || !props.modelValue.trim(),
              },
              () => [
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
                ),
              ],
            ),
          ]),
        ],
      );
  },
});

injectComponentStyle("ai");

export { PromptInput as AiPromptInput };
