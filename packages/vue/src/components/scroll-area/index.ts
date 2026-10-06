import { ScrollArea as ArkScrollArea } from "@ark-ui/vue/scroll-area";
import { defineComponent, h, type Component, type PropType } from "vue";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** ScrollArea, dressed in the paper-and-ink system: native bars
 * give way to quiet ink lanes that surface on hover and scroll. The parts — Root, Viewport, Content, Scrollbar, Thumb, Corner. */
const ScrollAreaRoot = defineComponent({
  name: "SScrollAreaRoot",
  setup(_, { attrs, slots }) {
    const id = useElementId("scroll-area", attrs);

    return () => h(ArkScrollArea.Root, { ...attrs, id: id.value }, slots);
  },
});

/** The complete scroll vessel around caller content, with one or both quiet
 * lanes depending on orientation. */
const ScrollAreaFacade = defineComponent({
  name: "SScrollArea",
  props: {
    orientation: {
      type: String as PropType<"vertical" | "horizontal" | "both">,
      default: "vertical",
    },
  },
  setup(props, { attrs, slots }) {
    return () => {
      const orientations =
        props.orientation === "both" ? ["vertical", "horizontal"] : [props.orientation];
      return h(ScrollAreaRoot, attrs, () => [
        h(ArkScrollArea.Viewport, () => h(ArkScrollArea.Content, slots.default)),
        ...orientations.map((orientation) =>
          h(ArkScrollArea.Scrollbar as never, { key: orientation, orientation }, () =>
            h(ArkScrollArea.Thumb),
          ),
        ),
        h(ArkScrollArea.Corner),
      ]);
    };
  },
});

export const ScrollArea = defineFamily(ScrollAreaFacade, {
  ...ArkScrollArea,
  Root: ScrollAreaRoot,
} as unknown as { Root: Component } & Record<string, Component>) as typeof ScrollAreaFacade &
  Omit<typeof ArkScrollArea, "Root"> & { Root: typeof ScrollAreaRoot };
