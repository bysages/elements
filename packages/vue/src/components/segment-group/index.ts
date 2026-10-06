import { SegmentGroup as ArkSegmentGroup } from "@ark-ui/vue/segment-group";
import { injectComponentStyle } from "@bysages/core";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** SegmentGroup, dressed in the paper-and-ink system: a hairline tray
 * where one flat ink plate travels beneath the checked seal. The parts — Root, Label, Indicator, Item, ItemText, ItemControl,
 * ItemHiddenInput. */
const SegmentGroupRoot = defineComponent({
  name: "SSegmentGroupRoot",
  props: {
    /** One rung of the control-height ladder for the segments. The
     * family keeps its compact register, so the rungs sit one notch
     * below the global ladder — the default md rests at the small
     * height. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
    /** The tray reads as one row of seals; the underlying machine
     * defaults to a vertical stack, so the horizontal row is ours to
     * assert. */
    orientation: {
      type: String as PropType<"horizontal" | "vertical">,
      default: "horizontal",
    },
  },
  setup(props, { attrs, slots }) {
    const id = useElementId("segment-group", attrs);
    injectComponentStyle("segment-group");

    return () =>
      h(
        ArkSegmentGroup.Root,
        {
          ...attrs,
          id: id.value,
          "data-size": props.size,
          orientation: props.orientation,
        },
        slots,
      );
  },
});

export type SegmentGroupItem = {
  value: string;
  label: string;
  disabled?: boolean;
};

/** The complete segmented choice behind one value and its named seals. */
const SegmentGroupFacade = defineComponent({
  name: "SSegmentGroup",
  props: {
    modelValue: { type: String, default: undefined },
    defaultValue: { type: String, default: undefined },
    items: { type: Array as PropType<SegmentGroupItem[]>, required: true },
    label: { type: String, default: undefined },
    disabled: { type: Boolean, default: false },
    readOnly: { type: Boolean, default: false },
    /** One rung of the control-height ladder for the segments. The
     * family keeps its compact register, so the rungs sit one notch
     * below the global ladder — the default md rests at the small
     * height. */
    size: { type: String as PropType<"sm" | "md" | "lg">, default: "md" },
    /** The tray reads as one row of seals; the underlying machine
     * defaults to a vertical stack, so the horizontal row is ours to
     * assert. */
    orientation: {
      type: String as PropType<"horizontal" | "vertical">,
      default: "horizontal",
    },
  },
  emits: ["update:modelValue"],
  setup(props, { attrs, emit }: SetupContext) {
    injectComponentStyle("segment-group");

    return () =>
      h(
        SegmentGroupRoot,
        {
          ...attrs,
          disabled: props.disabled,
          readOnly: props.readOnly,
          orientation: props.orientation,
          size: props.size,
          defaultValue: props.defaultValue,
          ...(props.modelValue === undefined ? {} : { modelValue: props.modelValue }),
          "onUpdate:modelValue": (value: string | null) => emit("update:modelValue", value ?? ""),
        },
        () => [
          h(ArkSegmentGroup.Indicator),
          ...props.items.map((item) =>
            h(
              ArkSegmentGroup.Item,
              { key: item.value, value: item.value, disabled: item.disabled },
              () => [
                h(ArkSegmentGroup.ItemText, () => item.label),
                h(ArkSegmentGroup.ItemControl),
                h(ArkSegmentGroup.ItemHiddenInput),
              ],
            ),
          ),
        ],
      );
  },
});

type SegmentGroupParts = Omit<typeof ArkSegmentGroup, "Root"> & {
  Root: typeof SegmentGroupRoot;
};

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const SegmentGroup = defineFamily(SegmentGroupFacade, {
  ...ArkSegmentGroup,
  Root: SegmentGroupRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof SegmentGroupFacade &
  SegmentGroupParts;
