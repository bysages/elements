import { DateInput as ArkDateInput, type DateInputDateValue } from "@ark-ui/vue/date-input";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

export type {
  DateInputFocusChangeDetails,
  DateInputValueChangeDetails,
} from "@ark-ui/vue/date-input";

/** DateInput, dressed in the paper-and-ink system: a segmented
 * field where the focused segment takes the flat ink fill. The parts — Root, Label, Control, SegmentGroup, Segment, SegmentContext,
 * HiddenInput. */
const DateInputRoot = defineComponent({
  name: "SDateInputRoot",
  props: {
    /** One rung of the control-height ladder for the segmented field. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  setup(props, { attrs, slots }) {
    const id = useElementId("date-input", attrs);
    injectComponentStyle("date-input");

    return () => h(ArkDateInput.Root, { ...attrs, id: id.value, "data-size": props.size }, slots);
  },
});

type DateInputFacadeValue = DateInputDateValue | DateInputDateValue[];

function toDateInputValue(value: DateInputFacadeValue | undefined) {
  if (value === undefined) return undefined;
  return Array.isArray(value) ? value : [value];
}

/** The complete segmented date field behind one model value. */
const DateInputFacade = defineComponent({
  name: "SDateInput",
  props: {
    modelValue: {
      type: [Object, Array] as PropType<DateInputFacadeValue>,
      default: undefined,
    },
    defaultValue: {
      type: [Object, Array] as PropType<DateInputFacadeValue>,
      default: undefined,
    },
    disabled: { type: Boolean, default: false },
    invalid: { type: Boolean, default: false },
    required: { type: Boolean, default: false },
    label: { type: String, default: undefined },
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }: SetupContext) {
    return () => {
      const modelValue = toDateInputValue(props.modelValue);
      return h(
        DateInputRoot,
        {
          ...attrs,
          defaultValue: toDateInputValue(props.defaultValue),
          disabled: props.disabled,
          invalid: props.invalid,
          required: props.required,
          ...(modelValue === undefined ? {} : { modelValue }),
          "onUpdate:modelValue": (value: DateInputDateValue[]) => emit("update:modelValue", value),
        },
        () => [
          ...(props.label ? [h(ArkDateInput.Label, () => props.label)] : []),
          h(ArkDateInput.Control, () =>
            h(ArkDateInput.SegmentGroup, () =>
              h(ArkDateInput.SegmentContext, null, {
                default: (segment: unknown) =>
                  h(ArkDateInput.Segment as never, { segment } as never),
              }),
            ),
          ),
          h(ArkDateInput.HiddenInput),
        ],
      );
    };
  },
});

export const DateInput = defineFamily(DateInputFacade, {
  ...ArkDateInput,
  Root: DateInputRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof DateInputFacade &
  Omit<typeof ArkDateInput, "Root"> & { Root: typeof DateInputRoot };
