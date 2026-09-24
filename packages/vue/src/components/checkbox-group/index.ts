import { Checkbox as ArkCheckbox } from "@ark-ui/vue/checkbox";
import { useFieldContext } from "@ark-ui/vue/field";
import { injectComponentStyle } from "@bysages/core";
import type { SetupContext } from "vue";
import { computed, defineComponent, h, type PropType } from "vue";

export interface CheckboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

function checkGlyph() {
  return h(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      "stroke-width": 3,
      "stroke-linecap": "round",
      "stroke-linejoin": "round",
      "aria-hidden": true,
    },
    [h("path", { d: "m5 12.5 5 5L19 7" })],
  );
}

/**
 * One question, many answers: a labelled stack (or row) of the seal-cut
 * checkboxes bound to a single array. Toggling a box adds or removes its
 * value; the group itself is semantics (`role="group"`), the boxes stay
 * the machine-driven originals. Inside a `Field.Root` the group picks up
 * the field context, so the invalid and disabled states a Form routes to
 * its name dress every box at once.
 */
export const CheckboxGroup = defineComponent({
  name: "CheckboxGroup",
  props: {
    modelValue: { type: Array as PropType<string[]>, default: () => [] },
    options: { type: Array as PropType<CheckboxOption[]>, required: true },
    layout: { type: String as PropType<"vertical" | "horizontal">, default: "vertical" },
    invalid: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  emits: ["update:modelValue"],
  setup(props, ctx: SetupContext) {
    const field = useFieldContext();
    const selected = computed(() => new Set(props.modelValue));
    const invalid = computed(() => props.invalid || field?.value?.invalid === true);
    const disabled = computed(() => props.disabled || field?.value?.disabled === true);
    function toggle(value: string) {
      const next = new Set(selected.value);
      if (next.has(value)) next.delete(value);
      else next.add(value);
      ctx.emit("update:modelValue", [...next]);
    }
    return () =>
      h(
        "div",
        {
          ...ctx.attrs,
          role: "group",
          "data-scope": "checkbox-group",
          "data-part": "root",
          "data-layout": props.layout,
          "data-invalid": invalid.value ? "" : undefined,
        },
        props.options.map((option) => {
          const boxProps: Record<string, unknown> = {
            checked: selected.value.has(option.value),
            invalid: invalid.value,
            disabled: disabled.value || option.disabled === true,
            onCheckedChange: () => toggle(option.value),
          };
          // `as never` sidesteps TS2590 — the compiler cannot unroll the
          // machine's prop union inside h(); never widens to whichever
          // overload fits, any/unknown would swallow real mistakes.
          return h(ArkCheckbox.Root as never, boxProps, () => [
            h(ArkCheckbox.Control, () => h(ArkCheckbox.Indicator, () => checkGlyph())),
            h(ArkCheckbox.Label, () => option.label),
            h(ArkCheckbox.HiddenInput as never),
          ]);
        }),
      );
  },
});

// The options are the checkbox family's own seals — the group stylesheet
// only lays the row and column out around them.
injectComponentStyle("checkbox-group");
injectComponentStyle("checkbox");
