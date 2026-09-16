import { useFieldContext } from "@ark-ui/vue/field";
import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h } from "vue";

/** The bare multi-line input: the field recipe on a `<textarea>`, sized
 * by rows and resizable in the block direction. Standing alone it styles
 * itself from the `invalid` prop; inside a `Field.Root` it consumes the
 * field context, picking up the label id, the described-by wiring and
 * the invalid state for free. Disabled rides the native attribute. */
export const Textarea = defineComponent({
  name: "Textarea",
  props: {
    modelValue: { type: String, default: undefined },
    invalid: { type: Boolean, default: false },
  },
  emits: ["update:modelValue"],
  setup(props, ctx: SetupContext) {
    const field = useFieldContext();
    return () => {
      const fieldProps = field?.value?.getTextareaProps() ?? {};
      return h("textarea", {
        ...fieldProps,
        ...ctx.attrs,
        ...(props.modelValue !== undefined ? { value: props.modelValue } : null),
        "data-scope": "textarea",
        "data-part": "root",
        "data-invalid": props.invalid || fieldProps["data-invalid"] != null ? "" : undefined,
        onInput: (event: InputEvent) => {
          ctx.emit("update:modelValue", (event.target as HTMLTextAreaElement).value);
        },
      });
    };
  },
});

injectComponentStyle("textarea");
