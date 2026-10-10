import { ScrollArea as ArkScrollArea } from "@ark-ui/solid/scroll-area";
import { injectComponentStyle } from "@bysages/core/styling";
import { createComponent, mergeProps, type ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's ScrollArea, dressed in the paper-and-ink system: native bars
 * give way to quiet ink lanes that surface on hover and scroll. The API
 * is Ark's own — Root, Viewport, Content, Scrollbar, Thumb, Corner. */
function ScrollAreaRoot(props: ComponentProps<typeof ArkScrollArea.Root>) {
  const id = useElementId("scroll-area", () => props.id);

  return createComponent(
    ArkScrollArea.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

export const ScrollArea: typeof ScrollAreaRoot &
  Omit<typeof ArkScrollArea, "Root"> & { Root: typeof ScrollAreaRoot } = defineFamily(
  ScrollAreaRoot,
  {
    ...ArkScrollArea,
    Root: ScrollAreaRoot,
  },
);
injectComponentStyle("scroll-area");
