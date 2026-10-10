import { PasswordInput as ArkPasswordInput } from "@ark-ui/vue/password-input";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type PropType } from "vue";

import { defineFamily } from "../../internal/family";
import { iconNode } from "../../internal/icon";
import { useElementId } from "../../internal/id";

/** PasswordInput, dressed in the paper-and-ink system: the reveal
 * eye sits quiet at the field's edge and swaps in place — no shift, no
 * noise. The parts — Root, Label, Control, Input, Indicator,
 * VisibilityTrigger. */
const PasswordInputRoot = defineComponent({
  name: "SPasswordInputRoot",
  props: {
    /** One rung of the control-height ladder for the field and its eye. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    const id = useElementId("password-input", attrs);
    injectComponentStyle("password-input");

    return () =>
      h(ArkPasswordInput.Root, { ...attrs, id: id.value, "data-size": props.size }, slots);
  },
});

/** The one-tag path: the masked field and reveal control. Visibility
 * state, password-manager rules, and validation stay on the anatomy. */
const PasswordInputFacade = defineComponent({
  name: "SPasswordInput",
  props: {
    modelValue: { type: String, default: undefined },
    defaultValue: { type: String, default: undefined },
    label: { type: String, default: undefined },
    placeholder: { type: String, default: undefined },
    autoComplete: {
      type: String as PropType<"current-password" | "new-password">,
      default: undefined,
    },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }) {
    return () =>
      h(
        PasswordInputRoot,
        {
          ...attrs,
          size: props.size,
          autoComplete: props.autoComplete,
          disabled: props.disabled,
          invalid: props.invalid,
          required: props.required,
        },
        () => [
          ...(props.label ? [h(ArkPasswordInput.Label, () => props.label)] : []),
          h(ArkPasswordInput.Control, () => [
            h(ArkPasswordInput.Input, {
              placeholder: props.placeholder,
              defaultValue: props.defaultValue,
              ...(props.modelValue === undefined ? {} : { value: props.modelValue }),
              onInput: (event: InputEvent) =>
                emit("update:modelValue", (event.target as HTMLInputElement).value),
            } as never),
            h(ArkPasswordInput.VisibilityTrigger, () =>
              h(ArkPasswordInput.Indicator, null, {
                default: () => iconNode("eye"),
                fallback: () => iconNode("eye-off"),
              }),
            ),
          ]),
        ],
      );
  },
});

export const PasswordInput = defineFamily(PasswordInputFacade, {
  ...ArkPasswordInput,
  Root: PasswordInputRoot,
}) as unknown as typeof PasswordInputFacade &
  (Omit<typeof ArkPasswordInput, "Root"> & { Root: typeof PasswordInputRoot });
