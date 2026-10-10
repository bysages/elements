import { Checkbox as ArkCheckbox } from "@ark-ui/vue/checkbox";
import { useFieldContext } from "@ark-ui/vue/field";
import { injectComponentStyle } from "@bysages/core/styling";
import type { SetupContext } from "vue";
import { computed, defineComponent, h, type PropType } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";
import { Checkbox } from "../checkbox";

export interface CheckboxOption {
  label: string;
  value: string;
  disabled?: boolean;
}

function checkIcon() {
  return iconNode("check");
}

/**
 * One question, many answers: a labelled stack (or row) of the seal-cut
 * checkboxes bound to a single array. Ark's group owns selection, form
 * wiring, and limits; the facade maps an options list onto it. Inside a
 * `Field.Root` the group picks up the field context, so invalid and
 * disabled states dress every box at once.
 */
const CheckboxGroupFacade = defineComponent({
  name: "CheckboxGroup",
  props: {
    modelValue: { type: Array as PropType<string[]>, default: undefined },
    defaultValue: { type: Array as PropType<string[]>, default: undefined },
    options: { type: Array as PropType<CheckboxOption[]>, required: true },
    layout: { type: String as PropType<"vertical" | "horizontal">, default: "vertical" },
    /** One register for every box: falls onto each root's data-size for
     * the stylesheet to retune. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
    invalid: { type: Boolean, default: false },
    disabled: { type: Boolean, default: false },
  },
  emits: ["update:modelValue"],
  setup(props, ctx: SetupContext) {
    injectComponentStyle("checkbox-group");
    injectComponentStyle("checkbox");

    const field = useFieldContext();
    const uid = useElementId("checkbox-group", ctx.attrs);
    const invalid = computed(() => props.invalid || field?.value?.invalid === true);
    const disabled = computed(() => props.disabled || field?.value?.disabled === true);

    return () => {
      const groupProps: Record<string, unknown> = {
        asChild: true,
        ...(invalid.value ? { invalid: true } : {}),
        ...(disabled.value ? { disabled: true } : {}),
        ...(props.defaultValue === undefined ? {} : { defaultValue: props.defaultValue }),
        ...(props.modelValue === undefined ? {} : { modelValue: props.modelValue }),
        "onUpdate:modelValue": (value: string[]) => ctx.emit("update:modelValue", value),
      };

      return h(ArkCheckbox.Group as never, groupProps, () =>
        h(
          "div",
          {
            ...ctx.attrs,
            id: uid.value,
            "data-scope": "checkbox-group",
            "data-part": "root",
            "data-layout": props.layout,
            "data-invalid": invalid.value ? "" : undefined,
          },
          props.options.map((option) => {
            const checkboxId = `${uid.value}:checkbox:${option.value}`;
            return h(
              ArkCheckbox.Root as never,
              {
                id: checkboxId,
                value: option.value,
                ids: {
                  label: `${checkboxId}:label`,
                  hiddenInput: `${checkboxId}:input`,
                },
                "data-size": props.size,
                disabled: disabled.value || option.disabled === true,
              },
              () => [
                h(ArkCheckbox.Control, () => h(ArkCheckbox.Indicator, () => checkIcon())),
                h(ArkCheckbox.Label, () => option.label),
                h(ArkCheckbox.HiddenInput as never),
              ],
            );
          }),
        ),
      );
    };
  },
});

// The options are the checkbox family's own seals — the group stylesheet
// only lays the row and column out around them.

export const CheckboxGroup = defineFamily(
  CheckboxGroupFacade,
  Checkbox,
) as typeof CheckboxGroupFacade & typeof Checkbox;
