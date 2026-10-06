import { FloatingPanel as ArkFloatingPanel } from "@ark-ui/solid/floating-panel";
import { injectComponentStyle } from "@bysages/core";
import { createComponent, mergeProps, type ComponentProps } from "solid-js";

import { defineFamily } from "../../internal/family";
import { useElementId } from "../../internal/id";

/** Ark's FloatingPanel, dressed in the paper-and-ink system: the shared
 * popup vessel let loose — a draggable, resizable sheet whose header is the
 * handle. The API is Ark's own — Root, Trigger, Positioner, Content, Header,
 * Title, Control, DragTrigger, StageTrigger, CloseTrigger, ResizeTrigger,
 * Body. */
function FloatingPanelRoot(props: ComponentProps<typeof ArkFloatingPanel.Root>) {
  const id = useElementId("floating-panel", () => props.id);

  return createComponent(
    ArkFloatingPanel.Root,
    mergeProps(props, {
      get id() {
        return id();
      },
    }),
  );
}

export const FloatingPanel: typeof FloatingPanelRoot &
  Omit<typeof ArkFloatingPanel, "Root"> & { Root: typeof FloatingPanelRoot } = defineFamily(
  FloatingPanelRoot,
  {
    ...ArkFloatingPanel,
    Root: FloatingPanelRoot,
  },
);
injectComponentStyle("floating-panel");
