import { ScrollArea as ArkScrollArea } from "@ark-ui/react/scroll-area";
import { injectComponentStyle } from "@bysages/core/styling";
import type { CSSProperties, ReactNode } from "react";
import type { ComponentProps } from "react";

import { useElementId } from "../../internal/id";

type ScrollAreaFade = "vertical" | "horizontal" | "both";
type ScrollAreaRootProps = ComponentProps<typeof ArkScrollArea.Root> & { fade?: ScrollAreaFade };

/** Ark's ScrollArea, dressed in the paper-and-ink system: native bars
 * give way to quiet ink lanes that surface on hover and scroll. The API
 * is Ark's own — Root, Viewport, Content, Scrollbar, Thumb, Corner. */
function ScrollAreaRoot({ fade, ...props }: ScrollAreaRootProps) {
  injectComponentStyle("scroll-area");
  const id = useElementId("scroll-area", props);

  return <ArkScrollArea.Root {...props} id={id} data-fade={fade} />;
}

type ScrollAreaFacadeProps = {
  orientation?: "vertical" | "horizontal" | "both";
  /** Dissolve the viewport's edges — see Root's `fade`. */
  fade?: ScrollAreaFade;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

/** The complete scroll vessel around caller content, with one or both quiet
 * lanes depending on orientation. */
function ScrollAreaFacade(props: ScrollAreaFacadeProps) {
  const { orientation = "vertical", fade, className, style, children } = props;
  const orientations: Array<"vertical" | "horizontal"> =
    orientation === "both" ? ["vertical", "horizontal"] : [orientation];

  return (
    <ScrollAreaRoot fade={fade} className={className} style={style}>
      <ArkScrollArea.Viewport>
        <ArkScrollArea.Content>{children}</ArkScrollArea.Content>
      </ArkScrollArea.Viewport>
      {orientations.map((item) => (
        <ArkScrollArea.Scrollbar key={item} orientation={item}>
          <ArkScrollArea.Thumb />
        </ArkScrollArea.Scrollbar>
      ))}
      <ArkScrollArea.Corner />
    </ScrollAreaRoot>
  );
}

export const ScrollArea: typeof ScrollAreaFacade &
  Omit<typeof ArkScrollArea, "Root"> & { Root: typeof ScrollAreaRoot } = Object.assign(
  ScrollAreaFacade,
  {
    ...ArkScrollArea,
    Root: ScrollAreaRoot,
  },
) as typeof ScrollAreaFacade & Omit<typeof ArkScrollArea, "Root"> & { Root: typeof ScrollAreaRoot };
