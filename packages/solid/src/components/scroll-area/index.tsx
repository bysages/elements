import { ScrollArea as ArkScrollArea } from "@ark-ui/solid/scroll-area";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, createComponent, mergeProps, type ComponentProps } from "solid-js";
import type { JSX } from "solid-js";

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

export interface ScrollAreaFacadeProps {
  class?: string;
  orientation?: "vertical" | "horizontal" | "both";
  children?: JSX.Element;
}

/** The complete scroll vessel around caller content, with one or both quiet
 * lanes depending on orientation. */
function ScrollAreaFacade(props: ScrollAreaFacadeProps) {
  const orientations = (): ("vertical" | "horizontal")[] =>
    props.orientation === "both" ? ["vertical", "horizontal"] : [props.orientation ?? "vertical"];

  return (
    <ScrollAreaRoot class={props.class}>
      <ArkScrollArea.Viewport>
        <ArkScrollArea.Content>{props.children}</ArkScrollArea.Content>
      </ArkScrollArea.Viewport>
      <For each={orientations()}>
        {(orientation) => (
          <ArkScrollArea.Scrollbar orientation={orientation}>
            <ArkScrollArea.Thumb />
          </ArkScrollArea.Scrollbar>
        )}
      </For>
      <ArkScrollArea.Corner />
    </ScrollAreaRoot>
  );
}

export const ScrollArea: typeof ScrollAreaFacade &
  Omit<typeof ArkScrollArea, "Root"> & { Root: typeof ScrollAreaRoot } = defineFamily(
  ScrollAreaFacade,
  {
    ...ArkScrollArea,
    Root: ScrollAreaRoot,
  },
);
injectComponentStyle("scroll-area");
