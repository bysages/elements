import { Splitter as ArkSplitter } from "@ark-ui/vue/splitter";
import { injectComponentStyle } from "@bysages/core/styling";
import { defineComponent, h, type Component, type PropType, type SetupContext } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Splitter, dressed in the paper-and-ink system: panels divide on
 * a hairline and a small paper-seal thumb answers the hand. The parts — Root, Panel, ResizeTrigger, ResizeTriggerIndicator. */
const SplitterRoot = defineComponent({
  name: "SSplitterRoot",
  setup(_, { attrs, slots }) {
    const id = useElementId("splitter", attrs);

    return () => h(ArkSplitter.Root as never, { ...attrs, id: id.value }, slots);
  },
});

export type SplitterItem = {
  id: string;
  label: string;
};

/** The complete equal-height splitter; collapsed panels and custom panel
 * bodies stay on the anatomy. */
const SplitterFacade = defineComponent({
  name: "SSplitter",
  props: {
    items: { type: Array as PropType<SplitterItem[]>, required: true },
    defaultValue: { type: Array as PropType<number[]>, default: undefined },
    modelValue: { type: Array as PropType<number[]>, default: undefined },
    orientation: {
      type: String as PropType<"horizontal" | "vertical">,
      default: "horizontal",
    },
  },
  emits: {
    "update:modelValue": (_value: number[]) => true,
  },
  setup(props, { attrs, emit }: SetupContext) {
    injectComponentStyle("splitter");
    const panels = () => props.items.map((item) => ({ id: item.id }));

    return () =>
      h(
        SplitterRoot,
        {
          ...attrs,
          orientation: props.orientation,
          panels: panels(),
          defaultSize: props.defaultValue,
          ...(props.modelValue === undefined ? {} : { size: props.modelValue }),
          "onUpdate:size": (size: number[]) => emit("update:modelValue", size),
        } as never,
        () =>
          props.items.flatMap((item, index) => {
            const next = props.items.at(index + 1);
            return [
              h(ArkSplitter.Panel, { key: item.id, id: item.id }, () => item.label),
              ...(next
                ? [
                    h(
                      ArkSplitter.ResizeTrigger,
                      {
                        key: `${item.id}:${next.id}`,
                        id: `${item.id}:${next.id}`,
                        "aria-label": "Resize panels",
                      },
                      () => h(ArkSplitter.ResizeTriggerIndicator),
                    ),
                  ]
                : []),
            ];
          }),
      );
  },
});

type SplitterParts = Omit<typeof ArkSplitter, "Root"> & {
  Root: typeof SplitterRoot;
};

/* Ark's namespace is frozen — spread copies the members as data
 * properties so Root can be the sized wrapper while the rest stay
 * Ark's own parts. */
export const Splitter = defineFamily(SplitterFacade, {
  ...ArkSplitter,
  Root: SplitterRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof SplitterFacade &
  SplitterParts;
