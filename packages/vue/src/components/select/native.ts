import { useFieldContext } from "@ark-ui/vue/field";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, ref, watchPostEffect, type PropType, type SetupContext } from "vue";

/** One row of the platform's own list. */
export interface NativeSelectOption {
  label: string;
  value: string;
  disabled?: boolean;
}

/** The native select wearing the field recipe: the platform's own list
 * behind the same hairline shell the framed select wears. The shell is
 * a wrapper so the indicator rides beside the value as a real stroke —
 * the same chevron the framed trigger shows — instead of a gradient
 * painted onto the control. */
export const NativeSelect = defineComponent({
  name: "NativeSelect",
  props: {
    modelValue: { type: String, default: undefined },
    options: { type: Array as PropType<NativeSelectOption[]>, required: true },
    /** One rung of the control-height ladder. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
    invalid: { type: Boolean, default: false },
    placeholder: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
  },
  emits: ["update:modelValue"],
  setup(props, ctx: SetupContext) {
    injectComponentStyle("select");

    const field = useFieldContext();
    const select = ref<HTMLSelectElement | null>(null);
    // The browser picks the first enabled option the moment the option
    // children land, forgetting whatever the value property held before
    // they existed — so the controlled value must be re-asserted after
    // every patch, or every select opens on its first row.
    watchPostEffect(() => {
      if (select.value) select.value.value = props.modelValue ?? "";
    });
    return () => {
      const fieldProps = field?.value?.getInputProps() ?? {};
      // Accessible naming rides the select itself — the wrapper span
      // never carries it.
      const {
        "aria-label": ariaLabel,
        "aria-labelledby": ariaLabelledby,
        ...rootAttrs
      } = ctx.attrs;
      const named = {
        ...(ariaLabel != null ? { "aria-label": ariaLabel as string } : null),
        ...(ariaLabelledby != null ? { "aria-labelledby": ariaLabelledby as string } : null),
      };
      const empty = props.modelValue == null || props.modelValue === "";
      const off = props.disabled || field?.value?.disabled === true;
      return h(
        "span",
        {
          ...rootAttrs,
          "data-scope": "select",
          "data-part": "native-root",
          "data-size": props.size,
          "data-invalid": props.invalid || field?.value?.invalid === true ? "" : undefined,
          "data-disabled": off ? "" : undefined,
          "data-placeholder-shown": empty ? "" : undefined,
        },
        [
          h(
            "select",
            {
              ...fieldProps,
              ...named,
              ref: select,
              "data-scope": "select",
              "data-part": "native",
              disabled: off || undefined,
              onChange: (event: Event) => {
                ctx.emit("update:modelValue", (event.target as HTMLSelectElement).value);
              },
            },
            [
              props.placeholder
                ? h(
                    "option",
                    { value: "", disabled: true, hidden: empty ? undefined : true },
                    props.placeholder,
                  )
                : null,
              ...props.options.map((option) =>
                h(
                  "option",
                  {
                    key: option.value,
                    value: option.value,
                    disabled: option.disabled || undefined,
                  },
                  option.label,
                ),
              ),
            ],
          ),
          h(
            "svg",
            {
              "data-scope": "select",
              "data-part": "native-icon",
              viewBox: "0 0 16 16",
              "aria-hidden": "true",
            },
            [
              h("path", {
                d: "M4 6l4 4 4-4",
                fill: "none",
                stroke: "currentColor",
                "stroke-width": "1.5",
                "stroke-linecap": "round",
                "stroke-linejoin": "round",
              }),
            ],
          ),
        ],
      );
    };
  },
});
