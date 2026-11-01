import { ScrollArea as ArkScrollArea } from "@ark-ui/solid/scroll-area";
import { injectComponentStyle } from "@bysages/core/styling";
import { For, createComponent, mergeProps, splitProps, type ComponentProps } from "solid-js";
import type { JSX } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

type ScrollAreaFade = "vertical" | "horizontal" | "both";
type ScrollAreaRootProps = ComponentProps<typeof ArkScrollArea.Root> & { fade?: ScrollAreaFade };

/** Ark's ScrollArea, dressed in the paper-and-ink system: native bars
 * give way to quiet ink lanes that surface on hover and scroll. The API
 * is Ark's own — Root, Viewport, Content, Scrollbar, Thumb, Corner. */
function ScrollAreaRoot(props: ScrollAreaRootProps) {
  const [own, rest] = splitProps(props, ["fade"]);
  const id = useElementId("scroll-area", () => rest.id);

  return createComponent(
    ArkScrollArea.Root,
    mergeProps(rest, {
      get id() {
        return id();
      },
      get "data-fade"() {
        return own.fade;
      },
    }),
  );
}

export interface ScrollAreaFacadeProps {
  class?: string;
  orientation?: "vertical" | "horizontal" | "both";
  /** Dissolve the viewport's edges — see Root's `fade`. */
  fade?: ScrollAreaFade;
  children?: JSX.Element;
}

/** The complete scroll vessel around caller content, with one or both quiet
 * lanes depending on orientation. */
function ScrollAreaFacade(props: ScrollAreaFacadeProps) {
  const orientations = (): ("vertical" | "horizontal")[] =>
    props.orientation === "both" ? ["vertical", "horizontal"] : [props.orientation ?? "vertical"];

  return (
    <ScrollAreaRoot class={props.class} fade={props.fade}>
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
