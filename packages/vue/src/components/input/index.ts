import { useFieldContext } from "@ark-ui/vue/field";
import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { defineComponent, h, type PropType } from "vue";

/** The bare text input: the field recipe — border, surface, focus halo —
 * on a native control. Standing alone it styles itself from the `invalid`
 * prop; inside a `Field.Root` it consumes the field context, picking up
 * the label id, the described-by wiring and the invalid state for free,
 * which is also the seam the Form validation layer will drive. Disabled
 * rides the native attribute. */
export const Input = defineComponent({
  name: "Input",
  props: {
    modelValue: { type: [String, Number] as PropType<string | number>, default: undefined },
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
    invalid: { type: Boolean, default: false },
  },
  emits: ["update:modelValue"],
  setup(props, ctx: SetupContext) {
    const field = useFieldContext();
    return () => {
      const fieldProps = field?.value?.getInputProps() ?? {};
      return h("input", {
        ...fieldProps,
        ...ctx.attrs,
        ...(props.modelValue !== undefined ? { value: props.modelValue } : null),
        "data-scope": "input",
        "data-part": "root",
        "data-size": props.size,
        "data-invalid": props.invalid || fieldProps["data-invalid"] != null ? "" : undefined,
        onInput: (event: InputEvent) => {
          ctx.emit("update:modelValue", (event.target as HTMLInputElement).value);
        },
      });
    };
  },
});

injectComponentStyle("input");
